import { useEffect, useState } from 'react'
import api from '../../services/api'

interface Log {
  id: number
  email: string
  acao: string
  dataHora: string
  detalhes: string
}

interface Dashboard {
  totalUsuarios: number
  totalAdmins: number
  totalUsers: number
  ultimosLogs: Log[]
}

const ACAO_COLOR: Record<string, string> = {
  LOGIN: '#4caf50',
  REGISTRO: '#f9a825',
  LOGOUT: '#ef9a9a',
}

export default function Home() {
  const [dados, setDados] = useState<Dashboard | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    api.get<Dashboard>('/admin/dashboard')
      .then((r) => setDados(r.data))
      .finally(() => setCarregando(false))
  }, [])

  const stats = [
    { label: 'Total de usuários', value: dados?.totalUsuarios, icon: '👥', color: '#4caf50' },
    { label: 'Administradores', value: dados?.totalAdmins, icon: '🛡️', color: '#f9a825' },
    { label: 'Usuários padrão', value: dados?.totalUsers, icon: '👤', color: '#2e7d32' },
  ]

  return (
    <div style={{ padding: 28 }}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Dashboard</h2>
          <p style={s.sub}>Visão geral do sistema</p>
        </div>
      </div>

      <div style={s.statsRow}>
        {stats.map((stat, i) => (
          <div key={i} style={s.statCard}>
            <div style={{ ...s.statIconWrap, backgroundColor: stat.color + '22' }}>
              <span style={s.statIcon}>{stat.icon}</span>
            </div>
            <div style={s.statInfo}>
              <span style={s.statValue}>
                {carregando ? '—' : (stat.value ?? '—')}
              </span>
              <span style={s.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={s.tableCard}>
        <div style={s.tableHeader}>
          <span style={s.tableTitle}>Últimas atividades</span>
          <span style={s.tableBadge}>{dados?.ultimosLogs.length ?? 0} registros</span>
        </div>

        {carregando ? (
          <p style={s.loading}>Carregando...</p>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                {['Usuário', 'Ação', 'Data/Hora', 'Detalhes'].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dados?.ultimosLogs.map((log) => (
                <tr key={log.id} style={s.tr}>
                  <td style={s.td}>{log.email}</td>
                  <td style={s.td}>
                    <span style={{
                      ...s.badge,
                      backgroundColor: (ACAO_COLOR[log.acao] ?? '#475569') + '22',
                      color: ACAO_COLOR[log.acao] ?? '#94a3b8',
                    }}>
                      {log.acao}
                    </span>
                  </td>
                  <td style={s.td}>{new Date(log.dataHora).toLocaleString('pt-BR')}</td>
                  <td style={{ ...s.td, color: '#64748b' }}>{log.detalhes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: '#e8f5e9',
  },
  sub: {
    margin: '4px 0 0',
    fontSize: 13,
    color: '#4a7c52',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#0c1f0e',
    border: '1px solid #1a3a1e',
    borderRadius: 12,
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  statIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statIcon: {
    fontSize: 22,
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  statValue: {
    fontSize: 30,
    fontWeight: 700,
    color: '#e8f5e9',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#4a7c52',
    marginTop: 4,
  },
  tableCard: {
    backgroundColor: '#0c1f0e',
    border: '1px solid #1a3a1e',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid #1a3a1e',
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#e8f5e9',
  },
  tableBadge: {
    fontSize: 11,
    backgroundColor: 'rgba(76,175,80,0.15)',
    color: '#81c784',
    padding: '3px 10px',
    borderRadius: 20,
  },
  loading: {
    padding: '24px 20px',
    color: '#4a7c52',
    margin: 0,
    fontSize: 14,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '10px 20px',
    fontSize: 11,
    fontWeight: 600,
    color: '#4a7c52',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid #1a3a1e',
  },
  tr: {
    borderBottom: '1px solid #112214',
  },
  td: {
    padding: '12px 20px',
    fontSize: 13,
    color: '#a5d6a7',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
  },
}
