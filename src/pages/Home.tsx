import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 16px' }}>
      <h2>Bem-vindo, {usuario?.nome}!</h2>
      <p>{usuario?.email}</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
