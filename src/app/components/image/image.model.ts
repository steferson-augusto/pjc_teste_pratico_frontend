/* eslint-disable camelcase */
export interface Image {
  id?: number
  name: string
  album_id: number
  url: string
}
export interface ImageRequest {
  images?: Image[]
  message?: string
}
