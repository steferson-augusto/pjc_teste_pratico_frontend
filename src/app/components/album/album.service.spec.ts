import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { AlbumService } from './album.service'
import { Album, AlbumPagination, AlbumRequest } from './album.model'

describe('AlbumService', () => {
  let service: AlbumService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlbumService],
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(AlbumService)
    httpMock = TestBed.inject(HttpTestingController)
    const token = { type: 'bearer', token: 'token', refreshToken: 'refresh' }
    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(token))
  })

  afterEach(() => {
    try {
      httpMock.verify()
      window.localStorage.removeItem('@TESTE-PRATICO:token')
    } catch (error) {
      console.log(error)
    }
  })

  it('Deve ser criado', () => {
    expect(service).toBeTruthy()
  })

  it('Deve solicitar listagem de álbuns com paginação', () => {
    const fake: AlbumPagination = {
      total: '15',
      perPage: 5,
      page: 1,
      lastPage: 3,
      data: [
        {
          id: 8,
          name: 'Bem Sertanejo',
          artist: 'Michel Teló',
          year: 2014
        },
        {
          id: 10,
          name: 'Bem Sertanejo - (1a Temporada) - EP',
          artist: 'Michel Teló',
          year: 2014
        },
        {
          id: 9,
          name: 'Bem Sertanejo - O Show (Ao Vivo)',
          artist: 'Michel Teló',
          year: 2017
        },
        {
          id: 2,
          name: 'Black Blooms',
          artist: 'Serj Tankian',
          year: 2019
        },
        {
          id: 13,
          name: 'Greatest Hits',
          artist: "Guns N' Roses",
          year: 2004
        }
      ]
    }
    const direction = 'asc'
    const orderBy = 'name'
    const page = 1
    const perPage = 5
    const album = ''

    service.list(direction, orderBy, page, perPage, album).subscribe(result => {
      expect(result).toEqual(fake)
    })
    const query = `direction=${direction}&columnName=${orderBy}&page=${page}&perPage=${perPage}&query=${album}`

    const request = httpMock.expectOne(`${service.baseUrl}?${query}`)
    expect(request.request.method).toBe('GET')
    request.flush(fake)
  })

  it('Deve solicitar a criação de um álbum', () => {
    const fake: AlbumRequest = {
      album: {
        name: 'Appetite for Destruction',
        year: 1987,
        artist_id: 4,
        id: 14
      },
      message: 'Álbum criado com sucesso'
    }

    service.create({ name: 'Appetite for Destruction', year: 1987, artist_id: 4 }).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(service.baseUrl)
    expect(request.request.method).toBe('POST')
    request.flush(fake)
  })

  it('Deve buscar álbum por ID', () => {
    const fake: Album = {
      id: 8,
      name: 'Bem Sertanejo',
      artist_id: 3,
      year: 2014,
      artist: {
        id: 3,
        name: 'Michel Teló'
      },
      images: []
    }

    service.getById('8').subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/8`)
    expect(request.request.method).toBe('GET')
    request.flush(fake)
  })

  it('Deve solicitar a atualização', () => {
    const fake: AlbumRequest = {
      album: {
        name: 'Appetite for Destruction',
        year: 1987,
        artist_id: 4,
        id: 8
      },
      message: 'Álbum atualizado com sucesso'
    }

    service.update({ ...fake.album }).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/8`)
    expect(request.request.method).toBe('PUT')
    request.flush(fake)
  })

  it('Deve solicitar a remoção de um álbum', () => {
    const fake: AlbumRequest = { message: 'Álbum apagado com sucesso' }

    service.delete(8).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/8`)
    expect(request.request.method).toBe('DELETE')
    request.flush(fake)
  })
})
