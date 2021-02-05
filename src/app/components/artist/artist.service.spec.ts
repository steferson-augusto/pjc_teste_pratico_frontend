import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ArtistService } from './artist.service'
import { Artist, ArtistPagination, ArtistRequest } from './artist.model'

describe('ArtistService', () => {
  let service: ArtistService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistService],
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(ArtistService)
    httpMock = TestBed.inject(HttpTestingController)
    const token = { type: 'bearer', token: 'token', refreshToken: 'refresh' }
    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(token))
  })

  afterEach(() => {
    try {
      window.localStorage.removeItem('@TESTE-PRATICO:token')
    } catch (error) {
      console.log(error)
    }
  })

  it('Deve ser criado', () => {
    expect(service).toBeTruthy()
  })

  it('Deve solicitar listagem de artistas com paginação', () => {
    httpMock.match(service.baseUrl)
    const fake: ArtistPagination = {
      total: '1',
      perPage: 5,
      page: 1,
      lastPage: 1,
      data: [
        {
          id: 5,
          name: 'Metallica'
        }
      ]
    }
    const direction = 'asc'
    const page = 1
    const perPage = 5
    const album = 'metal'

    service.list(direction, page, perPage, album).subscribe(result => {
      expect(result).toEqual(fake)
    })
    const query = `direction=${direction}&columnName=name&page=${page}&perPage=${perPage}&query=${album}`

    const request = httpMock.expectOne(`${service.baseUrl}?${query}`)
    expect(request.request.method).toBe('GET')
    request.flush(fake)
  })

  it('Deve solicitar todos artistas', done => {
    httpMock.match(service.baseUrl)
    const fake: Artist[] = [
      {
        id: 4,
        name: "Guns N' Roses"
      },
      {
        id: 5,
        name: 'Metallica'
      },
      {
        id: 3,
        name: 'Michel Teló'
      },
      {
        id: 2,
        name: 'Mike Shinoda'
      },
      {
        id: 1,
        name: 'Serj Tankian'
      }
    ]

    spyOn(service, 'all').and.returnValue(Promise.resolve(fake))
    service.all().then(result => {
      expect(result).toEqual(fake)
      done()
    })
  })

  it('Deve solicitar a criação de um artista', () => {
    httpMock.match(service.baseUrl)
    const fake: ArtistRequest = {
      artist: {
        name: 'Artista 1',
        id: 9
      },
      message: 'Artista criado com sucesso'
    }

    service.create({ name: 'Artista 1' }).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(service.baseUrl)
    expect(request.request.method).toBe('POST')
    request.flush(fake)
  })

  it('Deve buscar artista por ID', () => {
    const fake: Artist = {
      id: 3,
      name: 'Michel Teló',
      albums: [
        {
          id: 8,
          name: 'Bem Sertanejo',
          artist_id: 3,
          year: 2014,
          images: []
        },
        {
          id: 9,
          name: 'Bem Sertanejo - O Show (Ao Vivo)',
          artist_id: 3,
          year: 2017,
          images: []
        },
        {
          id: 10,
          name: 'Bem Sertanejo - (1a Temporada) - EP',
          artist_id: 3,
          year: 2014,
          images: []
        }
      ]
    }

    service.getById('8').subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/8`)
    expect(request.request.method).toBe('GET')
    request.flush(fake)
  })

  it('Deve solicitar a atualização de um artista', () => {
    const fake: ArtistRequest = {
      artist: {
        id: 1,
        name: 'Novo Artista'
      },
      message: 'Artista atualizado com sucesso'
    }

    service.update({ ...fake.artist }).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/1`)
    expect(request.request.method).toBe('PUT')
    request.flush(fake)
  })

  it('Deve solicitar a remoção de um artista', () => {
    const fake: ArtistRequest = { message: 'Artista apagado com sucesso' }

    service.delete(8).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/8`)
    expect(request.request.method).toBe('DELETE')
    request.flush(fake)
  })

  it('Emite sinal via event emitter', () => {
    spyOn(ArtistService.emitArtistCreated, 'emit')
    service.emit()
    expect(ArtistService.emitArtistCreated.emit).toHaveBeenCalledWith(true)
  })
})
