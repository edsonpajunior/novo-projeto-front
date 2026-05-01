import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { extrairMensagemErro } from '../utils'

export default function Registro() {
  const { registro } = useAuth()
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await registro(nome, email, senha)
      navigate('/')
    } catch (err: unknown) {
      setErro(extrairMensagemErro(err, 'Erro ao criar conta'))
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', padding: '0 16px' }}>
      <h2>Criar conta</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Senha (mínimo 6 caracteres)</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit" disabled={carregando} style={{ width: '100%', padding: 10 }}>
          {carregando ? 'Criando...' : 'Criar conta'}
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  )
}
