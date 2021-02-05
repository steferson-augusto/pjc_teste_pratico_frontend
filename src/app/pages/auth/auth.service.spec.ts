import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { AuthService } from './auth.service'
import { LoginRequest } from './auth.model'

describe('AuthService', () => {
  let service: AuthService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(AuthService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    try {
      httpMock.verify()
      window.localStorage.removeItem('@TESTE-PRATICO:token')
    } catch (error) {
      console.log(error)
    }
  })

  it('Deve ser instanciado', () => {
    expect(service).toBeTruthy()
  })

  it('Deve solicitar e retornar um token', () => {
    const fake: LoginRequest = {
      type: 'bearer',
      token: 'tokenI4fQ.I4aq-6NO3_e2KpukcfB-LzFUyAKutlcpXVpoVf3fMyA',
      refreshToken: 'refreshz1zgX6fJecMNCreP8Oi20IKUlp8pbRnz0Y7Lzpo0X7VInJaTUVshZTJdLs'
    }

    service.login({ email: 'email', password: 'password' }).subscribe(result => {
      expect(result).toEqual(fake)
    })
    const request = httpMock.expectOne(service.baseUrl)
    expect(request.request.method).toBe('POST')
    request.flush(fake)
  })

  it('Deve retornar token do local storage - getAuthorizationToken', () => {
    const fake: LoginRequest = {
      type: 'bearer',
      token: 'tokenI4fQ.I4aq-6NO3_e2KpukcfB-LzFUyAKutlcpXVpoVf3fMyA',
      refreshToken: 'refreshz1zgX6fJecMNCreP8Oi20IKUlp8pbRnz0Y7Lzpo0X7VInJaTUVshZTJdLs'
    }

    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(fake))
    let token = service.getAuthorizationToken()
    expect(token).toBe('tokenI4fQ.I4aq-6NO3_e2KpukcfB-LzFUyAKutlcpXVpoVf3fMyA')

    window.localStorage.removeItem('@TESTE-PRATICO:token')
    token = service.getAuthorizationToken()
    expect(token).toBeFalsy()
  })

  it('Deve retornar tempo de expiração do token - getTokenExpirationDate', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxMDc2NjIyOCwiZXhwIjoxNjEwNzY2NTI4fQ.I4aq-6NO3_e2KpukcfB-LzFUyAKutlcpXVpoVf3fMyA'
    let expiration = service.getTokenExpirationDate(token)
    const date = new Date(0)

    // https://jwt.io/
    date.setUTCSeconds(1610766528)
    expect(expiration).toEqual(date)

    expiration = service.getTokenExpirationDate('')
    expect(expiration).toBeNull()
  })

  it('Deve retornar status de expiração do token - isTokenExpired', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxMDc2NjIyOCwiZXhwIjoxNjEwNzY2NTI4fQ.I4aq-6NO3_e2KpukcfB-LzFUyAKutlcpXVpoVf3fMyA'
    let status = service.isTokenExpired(token)
    expect(status).toBeTrue()

    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxMjQ5MzM3NCwiZXhwIjoxOTI4MDY5Mzc0fQ.wzGORFooQdJylZ8VJHmfb8VdNz25NWXZSfC5Ml2iEXw'
    status = service.isTokenExpired(token)
    expect(status).toBeFalse()

    status = service.isTokenExpired('')
    expect(status).toBeTrue()
  })

  it('Deve verificar se usuário está logado - isUserLoggedIn', () => {
    const token = {
      type: 'bearer',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxMjQ5MzM3NCwiZXhwIjoxOTI4MDY5Mzc0fQ.wzGORFooQdJylZ8VJHmfb8VdNz25NWXZSfC5Ml2iEXw',
      refreshToken: '5c3a7db866515027d701dc27c3d249ecJZRybyIEZqOJzhDEbXhM4MKt2vaJPWSNlhPTOODLc2vAowrHW87p+g3iYc9ZT7p3'
    }
    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(token))
    let status = service.isUserLoggedIn()
    expect(status).toBeTrue()

    token.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxMjQ4NDIyMSwiZXhwIjoxNjEyNDg0NTIxfQ.ORVDztDzqZt8CMHwFSMUdy8owV56NJBPT_q4UkaWSQs'
    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(token))
    status = service.isUserLoggedIn()
    expect(status).toBeFalse()
  })

  it('Deve salvar token no local storage - saveToken', () => {
    const token = {
      type: 'bearer',
      token: 'token',
      refreshToken: 'refresh'
    }

    service.saveToken(token)
    const result = window.localStorage.getItem('@TESTE-PRATICO:token')
    const value = JSON.parse(result)
    expect(value).toEqual({ type: 'bearer', token: 'token', refreshToken: 'refresh' })
  })

  it('Deve requerir um novo JWT token através do refresh token - refreshToken', () => {
    const fake: LoginRequest = {
      type: 'bearer',
      token: 'tokenI4fQ.I4aq-6NO3_e2KpukcfB-LzFUyAKutlcpXVpoVf3fMyA',
      refreshToken: 'refreshz1zgX6fJecMNCreP8Oi20IKUlp8pbRnz0Y7Lzpo0X7VInJaTUVshZTJdLs'
    }

    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(
      { type: 'bearer', token: 'token', refreshToken: 'refresh' }
    ))

    service.refreshToken().subscribe(result => {
      expect(result).toEqual(fake)
    })
    const request = httpMock.expectOne(service.baseUrl)
    expect(request.request.method).toBe('POST')
    request.flush(fake)
  })

  it('Deve excluir token do local storage - logout', () => {
    const token = {
      type: 'bearer',
      token: 'token',
      refreshToken: 'refresh'
    }

    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(token))
    service.logout()

    const result = window.localStorage.getItem('@TESTE-PRATICO:token')
    const value = JSON.parse(result)
    expect(value).toBeFalsy()
  })
})
