import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MENU_ITEMS = [
  { icon: '📊', label: 'Dashboard', desc: 'Visão geral do sistema' },
  { icon: '👥', label: 'Usuários', desc: 'Gerenciar usuários' },
  { icon: '📋', label: 'Relatórios', desc: 'Gerar e exportar relatórios' },
  { icon: '⚙️', label: 'Configurações', desc: 'Preferências do sistema' },
  { icon: '📁', label: 'Documentos', desc: 'Arquivos e documentos' },
  { icon: '🔔', label: 'Notificações', desc: 'Alertas e avisos' },
]

const STATS = [
  { label: 'Usuários ativos', value: '1.284', delta: '+12%', up: true },
  { label: 'Processos abertos', value: '347', delta: '-4%', up: false },
  { label: 'Documentos', value: '5.901', delta: '+8%', up: true },
  { label: 'Tarefas pendentes', value: '23', delta: '+2', up: false },
]

export default function Home() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeItem, setActiveItem] = useState(0)
  const [menuHover, setMenuHover] = useState<number | null>(null)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = usuario?.nome
    ? usuario.nome.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div style={s.shell}>
      {/* Sidebar */}
      <aside style={{ ...s.sidebar, width: sidebarOpen ? 240 : 64 }}>
        <div style={s.sidebarTop}>
          <div style={s.brandRow}>
            {sidebarOpen && <span style={s.brandText}>BASE</span>}
            <button style={s.collapseBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        <nav style={s.nav}>
          {MENU_ITEMS.map((item, i) => (
            <button
              key={i}
              style={{
                ...s.navItem,
                ...(activeItem === i ? s.navItemActive : {}),
                ...(menuHover === i && activeItem !== i ? s.navItemHover : {}),
              }}
              onClick={() => setActiveItem(i)}
              onMouseEnter={() => setMenuHover(i)}
              onMouseLeave={() => setMenuHover(null)}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span style={s.navIcon}>{item.icon}</span>
              {sidebarOpen && <span style={s.navLabel}>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={s.sidebarBottom}>
          <button style={s.logoutBtn} onClick={handleLogout} title="Sair">
            <span style={s.navIcon}>🚪</span>
            {sidebarOpen && <span style={s.navLabel}>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={s.main}>
        {/* Topbar */}
        <header style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>{MENU_ITEMS[activeItem].label}</h1>
            <p style={s.pageSub}>{MENU_ITEMS[activeItem].desc}</p>
          </div>
          <div style={s.topbarRight}>
            <div style={s.notifDot}>
              <span>🔔</span>
              <span style={s.badge}>3</span>
            </div>
            <div style={s.avatar}>{initials}</div>
            <div style={s.userInfo}>
              <span style={s.userName}>{usuario?.nome}</span>
              <span style={s.userEmail}>{usuario?.email}</span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section style={s.statsRow}>
          {STATS.map((stat, i) => (
            <div key={i} style={s.statCard}>
              <span style={s.statValue}>{stat.value}</span>
              <span style={s.statLabel}>{stat.label}</span>
              <span style={{ ...s.statDelta, color: stat.up ? '#22c55e' : '#f97316' }}>
                {stat.delta} {stat.up ? '↑' : '↓'}
              </span>
            </div>
          ))}
        </section>

        {/* Content area */}
        <section style={s.contentArea}>
          <div style={s.contentCard}>
            <div style={s.contentCardHeader}>
              <span style={s.contentCardTitle}>Atividade Recente</span>
              <button style={s.viewAllBtn}>Ver tudo</button>
            </div>
            <div style={s.activityList}>
              {[
                { text: 'Novo usuário cadastrado: João Silva', time: 'há 5 min', dot: '#6366f1' },
                { text: 'Relatório mensal exportado com sucesso', time: 'há 23 min', dot: '#22c55e' },
                { text: 'Documento "Contrato #447" atualizado', time: 'há 1h', dot: '#f59e0b' },
                { text: 'Configurações do sistema salvas', time: 'há 2h', dot: '#3b82f6' },
                { text: 'Backup automático concluído', time: 'há 3h', dot: '#22c55e' },
              ].map((item, i) => (
                <div key={i} style={s.activityItem}>
                  <span style={{ ...s.activityDot, backgroundColor: item.dot }} />
                  <span style={s.activityText}>{item.text}</span>
                  <span style={s.activityTime}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={s.contentCard}>
            <div style={s.contentCardHeader}>
              <span style={s.contentCardTitle}>Acesso Rápido</span>
            </div>
            <div style={s.quickGrid}>
              {MENU_ITEMS.slice(0, 4).map((item, i) => (
                <button
                  key={i}
                  style={s.quickCard}
                  onClick={() => setActiveItem(i)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span style={s.quickIcon}>{item.icon}</span>
                  <span style={s.quickLabel}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0f1117',
    color: '#e2e8f0',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
  sidebar: {
    backgroundColor: '#161b27',
    borderRight: '1px solid #1e2535',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s ease',
    overflow: 'hidden',
    flexShrink: 0,
  },
  sidebarTop: {
    padding: '20px 12px 12px',
    borderBottom: '1px solid #1e2535',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  brandText: {
    fontSize: 20,
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: 2,
  },
  collapseBtn: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    fontSize: 12,
    padding: '4px 6px',
    borderRadius: 4,
  },
  nav: {
    flex: 1,
    padding: '12px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 8,
    border: 'none',
    background: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: 14,
    textAlign: 'left',
    transition: 'all 0.15s',
    width: '100%',
  },
  navItemActive: {
    backgroundColor: 'rgba(99,102,241,0.15)',
    color: '#818cf8',
  },
  navItemHover: {
    backgroundColor: '#1e2535',
    color: '#cbd5e1',
  },
  navIcon: {
    fontSize: 16,
    flexShrink: 0,
    width: 20,
    textAlign: 'center',
  },
  navLabel: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  sidebarBottom: {
    padding: '8px',
    borderTop: '1px solid #1e2535',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 8,
    border: 'none',
    background: 'none',
    color: '#f87171',
    cursor: 'pointer',
    fontSize: 14,
    width: '100%',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 32px',
    borderBottom: '1px solid #1e2535',
    backgroundColor: '#161b27',
  },
  pageTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: '#f1f5f9',
  },
  pageSub: {
    margin: '2px 0 0',
    fontSize: 13,
    color: '#64748b',
  },
  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  notifDot: {
    position: 'relative',
    fontSize: 20,
    cursor: 'pointer',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: 9,
    fontWeight: 700,
    borderRadius: 10,
    padding: '1px 4px',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
    color: 'white',
    flexShrink: 0,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#e2e8f0',
    lineHeight: 1.2,
  },
  userEmail: {
    fontSize: 11,
    color: '#64748b',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    padding: '24px 32px 0',
  },
  statCard: {
    backgroundColor: '#161b27',
    border: '1px solid #1e2535',
    borderRadius: 12,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#f1f5f9',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  statDelta: {
    fontSize: 12,
    fontWeight: 600,
    marginTop: 4,
  },
  contentArea: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: 16,
    padding: '16px 32px 32px',
  },
  contentCard: {
    backgroundColor: '#161b27',
    border: '1px solid #1e2535',
    borderRadius: 12,
    padding: '20px 24px',
  },
  contentCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentCardTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#e2e8f0',
  },
  viewAllBtn: {
    background: 'none',
    border: '1px solid #1e2535',
    color: '#6366f1',
    fontSize: 12,
    borderRadius: 6,
    padding: '4px 10px',
    cursor: 'pointer',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },
  activityText: {
    flex: 1,
    fontSize: 13,
    color: '#94a3b8',
  },
  activityTime: {
    fontSize: 11,
    color: '#475569',
    whiteSpace: 'nowrap',
  },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  quickCard: {
    backgroundColor: '#0f1117',
    border: '1px solid #1e2535',
    borderRadius: 10,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  quickIcon: {
    fontSize: 24,
  },
  quickLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 500,
  },
}
