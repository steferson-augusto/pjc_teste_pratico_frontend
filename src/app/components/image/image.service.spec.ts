import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ImageService } from './image.service'
import { ImageRequest } from './image.model'

describe('ImageService', () => {
  let service: ImageService
  let httpMock: HttpTestingController
  let files: Set<File>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService],
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(ImageService)
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

  it('Deve fazer upload de imagens', () => {
    const fake: ImageRequest = { message: 'Salvo com sucesso' }

    files = new Set()

    service.upload(files, 8).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(service.baseUrl)
    expect(request.request.method).toBe('POST')
    request.flush(fake)
  })

  it('Deve solicitar a remoção de uma imagem', () => {
    const fake: ImageRequest = { message: 'Imagem apagada com sucesso' }

    service.delete(8).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/8`)
    expect(request.request.method).toBe('DELETE')
    request.flush(fake)
  })
})
