import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AuthInterceptor } from './auth-interceptor'
import { ProfileService } from 'src/app/components/profile/profile.service'
import { environment } from 'src/environments/environment'

describe('AuthHttpInterceptor', () => {
  let service: ProfileService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProfileService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    })

    service = TestBed.inject(ProfileService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('Deve adicionar um Authorization header', () => {
    const token = {
      type: 'bearer',
      token: 'token http interceptor',
      refreshToken: 'refresh'
    }
    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(token))

    service.getProfile().subscribe(response => {
      expect(response).toBeTruthy()
    })

    const httpRequest = httpMock.expectOne(`${service.baseUrl}/authenticated`)

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true)
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer token http interceptor')
  })

  it('Deve obter novo JWT token caso o atual esteja expirado', () => {
    const token = { type: 'bearer', token: 'token 1', refreshToken: 'refresh 1' }
    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(token))

    service.getProfile().subscribe(response => {
      expect(response).toBeTruthy()
    })

    httpMock.expectOne(`${service.baseUrl}/authenticated`)
      .flush('Usuário deve estar logado', { status: 401, statusText: 'Unauthorized' })

    httpMock.expectOne(`${environment.baseUrl}/login`)
      .flush({ type: 'bearer', token: 'token 2', refreshToken: 'refresh 2' })

    const result = window.localStorage.getItem('@TESTE-PRATICO:token')
    const value = JSON.parse(result)
    expect(value).toEqual({ type: 'bearer', token: 'token 2', refreshToken: 'refresh 2' })
  })
})
