import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import jwtDecode from 'jwt-decode'

import { LoginRequest, UserLogin } from './auth.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) { }

  login (data: UserLogin) {
    return this.http.post<LoginRequest>(`${environment.baseUrl}/login`, data)
  }

  getAuthorizationToken () {
    try {
      const result = window.localStorage.getItem('@TESTE-PRATICO:token')
      const { token } = JSON.parse(result)
      return token
    } catch {
      return null
    }
  }

  getTokenExpirationDate (token: string): Date {
    const decoded: any = jwtDecode(token)

    if (decoded.exp === undefined) {
      return null
    }

    const date = new Date(0)
    date.setUTCSeconds(decoded.exp)
    return date
  }

  isTokenExpired (token?: string): boolean {
    if (!token) {
      return true
    }

    const date = this.getTokenExpirationDate(token)
    if (date === undefined) {
      return false
    }

    return !(date.valueOf() > new Date().valueOf())
  }

  isUserLoggedIn () {
    const token = this.getAuthorizationToken()
    if (!token) {
      return false
    } else if (this.isTokenExpired(token)) {
      return false
    }

    return true
  }

  saveToken (token: any) {
    window.localStorage.setItem('@TESTE-PRATICO:token', JSON.stringify(token))
  }

  refreshToken () {
    const result = window.localStorage.getItem('@TESTE-PRATICO:token')
    const { refreshToken } = JSON.parse(result)
    return this.http.post<any>(`${environment.baseUrl}/login`, { refreshToken })
  }

  logout () {
    window.localStorage.removeItem('@TESTE-PRATICO:token')
  }
}
