/* eslint-disable camelcase */
import { Album } from '../album/album.model'

export interface Artist {
  id?: number
  name: string
  albums?: Album[]
}

export interface ArtistRequest {
  artist?: Artist
  message?: string
}

export interface ArtistPagination {
  total: string
  perPage: number
  page: number
  lastPage: number
  data: Artist[]
}
