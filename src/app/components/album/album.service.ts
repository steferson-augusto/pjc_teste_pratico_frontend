import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Album, AlbumPagination, AlbumRequest } from './album.model'
import { environment } from 'src/environments/environment'

type Validations = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof Album | 'form']?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor (private http: HttpClient) { }

  readonly baseUrl = `${environment.baseUrl}/albums`
  readonly errors = {
    name: {
      required: 'Campo obrigatório',
      minlength: 'Mínimo de caracteres não atingido',
      min: 'Mínimo de caracteres não atingido',
      maxlength: 'Máximo de caracteres excedido',
      max: 'Máximo de caracteres excedido'
    },
    year: {
      integer: 'O valor deve ser um inteiro válido',
      range: 'O ano deve estar entre 1800 e 2021'
    },
    artist_id: {
      required: 'Campo obrigatório',
      exists: 'Este álbum não existe'
    },
    form: {}
  }

  readonly validations: Validations = Object.keys(this.errors).reduce((result, field) => {
    result[field] = Object.keys(this.errors[field])
    return result
  }, {}) as Validations

  list (order: string, orderBy: string, page: number, perPage: number, album: string): Observable<AlbumPagination> {
    const direction = order ?? 'asc'
    const query = `direction=${direction}&columnName=${orderBy}&page=${page}&perPage=${perPage}&query=${album}`
    return this.http.get<AlbumPagination>(`${this.baseUrl}?${query}`)
  }

  create (album: Album): Observable<AlbumRequest> {
    return this.http.post<AlbumRequest>(this.baseUrl, album)
  }
}
