import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { AlbumPagination } from './album.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor (private http: HttpClient) { }

  readonly baseUrl = `${environment.baseUrl}/albums`

  list (order: string, orderBy: string, page: number, perPage: number, album: string): Observable<AlbumPagination> {
    const direction = order ?? 'asc'
    const query = `direction=${direction}&columnName=${orderBy}&page=${page}&perPage=${perPage}&query=${album}`
    return this.http.get<AlbumPagination>(`${this.baseUrl}?${query}`)
  }
}
