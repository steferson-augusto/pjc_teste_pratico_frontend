import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { ArtistPagination } from './artist.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor (
    private http: HttpClient
  ) { }

  readonly baseUrl = `${environment.baseUrl}/artists`

  list (order: string, page: number, perPage: number, artist: string): Observable<ArtistPagination> {
    const direction = order ?? 'asc'
    const query = `direction=${direction}&columnName=name&page=${page}&perPage=${perPage}&query=${artist}`
    return this.http.get<ArtistPagination>(`${this.baseUrl}?${query}`)
  }
}
