export interface ApiErro {
  erro: string
}

export interface Usuario {
  email: string
  nome: string
}

export interface LoginResponse {
  token: string
  email: string
  nome: string
}
