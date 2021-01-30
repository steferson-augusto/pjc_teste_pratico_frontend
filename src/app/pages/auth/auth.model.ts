export interface UserLogin {
  email: string,
  password: string
}

export interface LoginRequest {
  type: 'bearer',
  token: string,
  refreshToken: string
}
