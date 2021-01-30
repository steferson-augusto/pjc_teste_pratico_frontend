/* eslint-disable camelcase */
export interface Image {
  id?: number
  name: string
  album_id: number
  url: string
}

export interface Album {
  id?: number
  name: string
  artist_id?: number
  year?: number
  images?: Image[]
}

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
