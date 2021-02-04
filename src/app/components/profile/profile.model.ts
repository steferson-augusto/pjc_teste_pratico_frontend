/* eslint-disable camelcase */
export interface Profile {
  id?: number
  name: string
  email: string
}

export interface ProfileRequest {
  user?: Profile
  message?: string
}
