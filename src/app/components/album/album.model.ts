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
