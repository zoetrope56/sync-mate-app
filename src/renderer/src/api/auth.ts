import client from './client'

export interface RegisterRequest {
  email: string
  password: string
}

export interface RegisterResponse {
  id: number
  email: string
  is_active: boolean
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const params = new URLSearchParams()
  params.append('email', email)
  params.append('password', password)

  const { data } = await client.post<LoginResponse>('/users/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  console.log('[auth] login response:', data)
  return data
}

export async function register(payload: RegisterRequest): Promise<RegisterResponse> {
  const { data } = await client.post<RegisterResponse>('/users/register', payload)
  return data
}
