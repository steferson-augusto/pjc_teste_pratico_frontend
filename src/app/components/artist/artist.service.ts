import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Artist, ArtistPagination, ArtistRequest } from './artist.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  data: Artist[] = []
  constructor (private http: HttpClient) {
    this.all()
  }

  static emitArtistCreated = new EventEmitter<boolean>()

  readonly baseUrl = `${environment.baseUrl}/artists`
  readonly errors = {
    name: {
      required: 'Campo obrigatório',
      minlength: 'Mínimo de caracteres não atingido',
      min: 'Mínimo de caracteres não atingido',
      maxlength: 'Máximo de caracteres excedido',
      max: 'Máximo de caracteres excedido'
    }
  }

  emit (): void {
    ArtistService.emitArtistCreated.emit(true)
  }

  async all () {
    try {
      const data = await this.http.get<Artist[]>(this.baseUrl).toPromise()
      this.data = data
      return data
    } catch (error) {
      console.error(error)
    }
  }

  create (artist: Artist): Observable<ArtistRequest> {
    return this.http.post<ArtistRequest>(this.baseUrl, artist)
  }

  list (order: string, page: number, perPage: number, artist: string): Observable<ArtistPagination> {
    const direction = order ?? 'asc'
    const query = `direction=${direction}&columnName=name&page=${page}&perPage=${perPage}&query=${artist}`
    return this.http.get<ArtistPagination>(`${this.baseUrl}?${query}`)
  }

  getById (id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}/${id}`)
  }

  update (artist: Artist): Observable<ArtistRequest> {
    return this.http.put<ArtistRequest>(`${this.baseUrl}/${artist.id}`, artist)
  }

  delete (id: number): Observable<ArtistRequest> {
    return this.http.delete<ArtistRequest>(`${this.baseUrl}/${id}`)
  }
}
