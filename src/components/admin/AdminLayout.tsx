import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊', end: false },
  { to: '/admin/roles', label: 'Perfis', icon: '🛡️', end: false },
  { to: '/admin/logs', label: 'Logs', icon: '📋', end: false },
]

export default function AdminLayout() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  const initials = usuario?.nome
    ? usuario.nome.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div style={s.shell}>
      <aside style={{ ...s.sidebar, width: collapsed ? 64 : 220 }}>
        <div style={s.sidebarTop}>
          {!collapsed && (
            <span style={s.brand} onClick={() => navigate('/admin/home')}>BASE</span>
          )}
          <button style={s.collapseBtn} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '▶' : '◀'}
          </button>
        </div>

        <nav style={s.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                ...s.navItem,
                ...(isActive ? s.navItemActive : {}),
              })}
            >
              <span style={s.navIcon}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div style={s.sidebarBottom}>
          {!collapsed && (
            <div style={s.userRow}>
              <div style={s.avatar}>{initials}</div>
              <div style={s.userInfo}>
                <span style={s.userName}>{usuario?.nome}</span>
                <span style={s.userEmail}>{usuario?.email}</span>
              </div>
            </div>
          )}
          <button style={s.logoutBtn} onClick={handleLogout} title="Sair">
            <span style={s.navIcon}>🚪</span>
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      <main style={s.content}>
        <Outlet />
      </main>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#071409',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    color: '#e8f5e9',
  },
  sidebar: {
    backgroundColor: '#0c1f0e',
    borderRight: '1px solid #1a3a1e',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s ease',
    overflow: 'hidden',
    flexShrink: 0,
  },
  sidebarTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 12px 12px',
    borderBottom: '1px solid #1a3a1e',
    gap: 8,
  },
  brand: {
    fontSize: 18,
    fontWeight: 700,
    background: 'linear-gradient(135deg, #4caf50, #f9a825)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: 2,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  collapseBtn: {
    background: 'none',
    border: 'none',
    color: '#4a7c52',
    cursor: 'pointer',
    fontSize: 11,
    padding: '4px 6px',
    borderRadius: 4,
    flexShrink: 0,
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
    color: '#6dab74',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'background 0.15s, color 0.15s',
    whiteSpace: 'nowrap',
  },
  navItemActive: {
    backgroundColor: 'rgba(76,175,80,0.15)',
    color: '#81c784',
  },
  navIcon: {
    fontSize: 16,
    width: 20,
    textAlign: 'center',
    flexShrink: 0,
  },
  sidebarBottom: {
    padding: '8px',
    borderTop: '1px solid #1a3a1e',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '6px 4px',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 13,
    color: 'white',
    flexShrink: 0,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  userName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#e8f5e9',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  userEmail: {
    fontSize: 11,
    color: '#4a7c52',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 12px',
    borderRadius: 8,
    border: 'none',
    background: 'none',
    color: '#ef9a9a',
    cursor: 'pointer',
    fontSize: 14,
    width: '100%',
    whiteSpace: 'nowrap',
  },
  content: {
    flex: 1,
    backgroundColor: '#071409',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
}
