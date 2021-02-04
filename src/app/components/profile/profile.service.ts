import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment'
import { Profile, ProfileRequest } from './profile.model'
import { Observable } from 'rxjs'
import { DialogPassword } from './dialog-change-password/dialog-password.model'

type Validations = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof Profile | 'form']?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor (private http: HttpClient) { }

  readonly baseUrl = `${environment.baseUrl}/users`
  readonly errors = {
    name: {
      required: 'Campo obrigatório',
      minlength: 'Mínimo de caracteres não atingido',
      min: 'Mínimo de caracteres não atingido',
      maxlength: 'Máximo de caracteres excedido',
      max: 'Máximo de caracteres excedido'
    },
    email: {
      required: 'Campo obrigatório',
      email: 'Email inválido',
      minlength: 'Mínimo de caracteres não atingido',
      min: 'Mínimo de caracteres não atingido',
      maxlength: 'Máximo de caracteres excedido',
      max: 'Máximo de caracteres excedido'
    },
    form: {}
  }

  readonly validations: Validations = Object.keys(this.errors).reduce((result, field) => {
    result[field] = Object.keys(this.errors[field])
    return result
  }, {}) as Validations

  getProfile (): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/authenticated`)
  }

  update (data: Profile): Observable<ProfileRequest> {
    return this.http.put<ProfileRequest>(`${this.baseUrl}/authenticated`, data)
  }

  updatePassword (data: DialogPassword): Observable<ProfileRequest> {
    return this.http.put<ProfileRequest>(`${this.baseUrl}/password`, data)
  }
}
