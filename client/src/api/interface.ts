export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto extends LoginDto {
  fullName: string
  username: string
}

export interface AuthResponse {
  id: number
  email: string
  username: string
  fullName: string
  avatar: string
  currentHashedRefreshToken: string
}
