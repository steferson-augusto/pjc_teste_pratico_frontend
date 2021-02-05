/* eslint-disable camelcase */
import { Artist } from '../artist/artist.model'
import { Image } from '../image/image.model'

export interface Album {
  id?: number
  name: string
  artist?: string | Artist
  artist_id?: number
  year?: number
  images?: Image[]
}

export interface AlbumRequest {
  album?: Album
  message?: string
}

export interface AlbumPagination {
  total: string
  perPage: number
  page: number
  lastPage: number
  data: Album[]
}
