import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { ImageRequest } from './image.model'

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor (private http: HttpClient) { }

  readonly baseUrl = `${environment.baseUrl}/images`

  upload (files: Set<File>, id: number): Observable<ImageRequest> {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file, file.name))
    formData.append('album_id', `${id}`)

    return this.http.post<ImageRequest>(this.baseUrl, formData)
  }

  delete (id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
