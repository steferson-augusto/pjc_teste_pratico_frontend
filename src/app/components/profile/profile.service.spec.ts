import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ProfileService } from './profile.service'
import { Profile, ProfileRequest } from './profile.model'

describe('ProfileService', () => {
  let service: ProfileService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService],
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(ProfileService)
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

  it('Deve solicitar dados do usuário', () => {
    const fake: Profile = {
      id: 1,
      name: 'Super User Test',
      email: 'superuser@email.com'
    }

    service.getProfile().subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/authenticated`)
    expect(request.request.method).toBe('GET')
    request.flush(fake)
  })

  it('Deve solicitar atualização dos dados do usuário', () => {
    const fake: ProfileRequest = {
      user: {
        id: 1,
        name: 'User',
        email: 'user@email.com'
      },
      message: 'Usuário atualizado com sucesso'
    }

    service.update({ ...fake.user }).subscribe(result => {
      expect(result).toEqual(fake)
    })

    const request = httpMock.expectOne(`${service.baseUrl}/authenticated`)
    expect(request.request.method).toBe('PUT')
    request.flush(fake)
  })

  it('Deve solicitar atualização da senha do usuário', () => {
    const fake: ProfileRequest = { message: 'Senha atualizada com sucesso' }

    service.updatePassword({ old_password: 'antiga', password: 'atualizada', password_confirmation: 'atualizada' })
      .subscribe(result => {
        expect(result).toEqual(fake)
      })

    const request = httpMock.expectOne(`${service.baseUrl}/password`)
    expect(request.request.method).toBe('PUT')
    request.flush(fake)
  })
})
