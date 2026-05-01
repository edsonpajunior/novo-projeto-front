import { useAuth } from '../../context/AuthContext'
import fundoLogin from '../../assets/FundoLogin.png'

export default function HomePage() {
  const { usuario } = useAuth()

  return (
    <div style={s.page}>
      <div style={s.overlay} />
      <div style={s.content}>
        <div style={s.welcomeCard}>
          <p style={s.greeting}>Bem-vindo de volta,</p>
          <h1 style={s.name}>{usuario?.nome}</h1>
          <div style={s.divider} />
          <p style={s.hint}>Nenhum aviso no momento.</p>
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    position: 'relative',
    flex: 1,
    backgroundImage: `url(${fundoLogin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(10, 13, 20, 0.55)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    padding: 24,
    width: '100%',
    maxWidth: 560,
  },
  welcomeCard: {
    backgroundColor: 'rgba(12, 31, 14, 0.88)',
    border: '1px solid rgba(76,175,80,0.25)',
    borderRadius: 16,
    padding: '40px 48px',
    textAlign: 'center',
    backdropFilter: 'blur(8px)',
    width: '100%',
  },
  greeting: {
    margin: 0,
    fontSize: 15,
    color: '#81c784',
    letterSpacing: '0.5px',
  },
  name: {
    margin: '8px 0 0',
    fontSize: 32,
    fontWeight: 700,
    color: '#e8f5e9',
  },
  divider: {
    width: 48,
    height: 3,
    background: 'linear-gradient(135deg, #4caf50, #f9a825)',
    borderRadius: 2,
    margin: '20px auto',
  },
  hint: {
    margin: 0,
    fontSize: 14,
    color: '#4a7c52',
    fontStyle: 'italic',
  },
}
