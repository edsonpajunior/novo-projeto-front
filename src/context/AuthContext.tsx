import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import api from '../services/api'

interface Usuario {
  email: string
  nome: string
}

interface AuthContextType {
  usuario: Usuario | null
  login: (email: string, senha: string) => Promise<void>
  registro: (nome: string, email: string, senha: string) => Promise<void>
  logout: () => void
  autenticado: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const nome = localStorage.getItem('nome')
    const email = localStorage.getItem('email')
    return nome && email ? { nome, email } : null
  })

  const login = useCallback(async (email: string, senha: string) => {
    const { data } = await api.post('/auth/login', { email, senha })
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    localStorage.setItem('nome', data.nome)
    setUsuario({ email: data.email, nome: data.nome })
  }, [])

  const registro = useCallback(async (nome: string, email: string, senha: string) => {
    const { data } = await api.post('/auth/registro', { nome, email, senha })
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    localStorage.setItem('nome', data.nome)
    setUsuario({ email: data.email, nome: data.nome })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('nome')
    setUsuario(null)
  }, [])

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout, autenticado: !!usuario }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
