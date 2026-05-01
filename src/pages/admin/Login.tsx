import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/LogoCoomapCompleto.png'
import fundoLogin from '../../assets/FundoLogin.png'

type AlertType = 'error' | 'not-authenticated' | 'password-changed' | null

interface LoginProps {
  alertInicial?: AlertType
}

export default function Login({ alertInicial = null }: LoginProps) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [alert, setAlert] = useState<AlertType>(alertInicial)
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAlert(null)
    setCarregando(true)
    try {
      await login(usuario, senha)
      navigate('/admin/home')
    } catch {
      setAlert('error')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.loginBox}>
        <div style={s.card}>

          {alert === 'error' && (
            <div style={s.alertCard}>
              <div style={s.alertHeaderDanger}>
                <span style={s.alertIcon}>⚠ Atenção!</span>
              </div>
              <div style={s.alertBodyDanger}>
                <h5 style={s.alertText}>Usuário ou senha incorretos!</h5>
              </div>
            </div>
          )}

          {alert === 'not-authenticated' && (
            <div style={s.alertCard}>
              <div style={s.alertHeaderDanger}>
                <span style={s.alertIcon}>⚠ Atenção!</span>
              </div>
              <div style={s.alertBodyDanger}>
                <h5 style={s.alertText}>Você precisa estar logado para acessar o sistema!</h5>
              </div>
            </div>
          )}

          {alert === 'password-changed' && (
            <div style={s.alertCard}>
              <div style={s.alertHeaderSuccess}>
                <span style={s.alertIcon}>✓ Sucesso!</span>
              </div>
              <div style={s.alertBodySuccess}>
                <h5 style={s.alertText}>Senha alterada com sucesso!</h5>
              </div>
            </div>
          )}

          <div style={s.cardHeader}>
            <img src={logo} style={s.logo} alt="Logo COOMAP" />
            <h2 style={s.title}><b>BASE</b></h2>
          </div>

          <div style={s.cardBody}>
            <form onSubmit={handleSubmit}>
              <fieldset style={s.fieldset}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  style={s.input}
                  placeholder="Usuário"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset style={{ ...s.fieldset, marginBottom: 4 }}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  style={s.input}
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </fieldset>
              <button
                type="submit"
                disabled={carregando}
                style={s.button}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget
                  btn.style.backgroundColor = '#4caf50'
                  btn.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget
                  btn.style.backgroundColor = 'transparent'
                  btn.style.color = '#4caf50'
                }}
              >
                🔓 {carregando ? 'Entrando...' : 'Login'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    backgroundImage: `url(${fundoLogin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Source Sans Pro", "Helvetica Neue", Arial, sans-serif',
  },
  loginBox: { width: 360 },
  card: { backgroundColor: 'transparent' },
  alertCard: {
    display: 'flex',
    marginBottom: 16,
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  alertHeaderDanger: {
    padding: '8px 12px',
    backgroundColor: '#a94442',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  alertBodyDanger: {
    padding: '8px 14px',
    background: 'linear-gradient(to right, #e74c3c, #c0392b)',
    flex: 1,
  },
  alertHeaderSuccess: {
    padding: '8px 12px',
    backgroundColor: '#1a6496',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  alertBodySuccess: {
    padding: '8px 14px',
    background: 'linear-gradient(to right, #2980b9, #1a6496)',
    flex: 1,
  },
  alertIcon: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  alertText: { color: 'white', margin: 0, fontSize: 15, fontWeight: 400 },
  cardHeader: { textAlign: 'center', padding: '16px 0' },
  logo: { width: 160, height: 120, objectFit: 'contain' },
  title: { color: 'white', fontSize: 50, margin: '4px 0 0', lineHeight: 1.2 },
  cardBody: { padding: '4px 0 16px' },
  fieldset: { border: 'none', padding: 0, margin: '0 0 16px' },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px 0',
    fontSize: 15,
    borderRadius: 4,
    border: '1px solid #4caf50',
    color: '#4caf50',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    marginTop: 8,
    transition: 'background-color 0.15s, color 0.15s',
    letterSpacing: '0.5px',
  },
}
