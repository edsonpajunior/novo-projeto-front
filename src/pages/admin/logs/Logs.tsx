import { useEffect, useState } from 'react'
import api from '../../../services/api'

interface Log {
  id: number
  email: string
  acao: string
  dataHora: string
  detalhes: string
}

interface Pagina {
  content: Log[]
  totalPages: number
  number: number
}

export default function Logs() {
  const [pagina, setPagina] = useState<Pagina | null>(null)
  const [page, setPage] = useState(0)

  useEffect(() => { carregar(page) }, [page])

  async function carregar(p: number) {
    const { data } = await api.get<Pagina>(`/admin/logs?page=${p}&size=20`)
    setPagina(data)
  }

  return (
    <div style={{ padding: 28 }}>
      <h2 style={{ marginTop: 0 }}>Logs do sistema</h2>

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Usuário</th>
            <th style={s.th}>Ação</th>
            <th style={s.th}>Data/Hora</th>
            <th style={s.th}>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {pagina?.content.map((log) => (
            <tr key={log.id}>
              <td style={s.td}>{log.email}</td>
              <td style={s.td}>
                <span style={{ ...s.badge, ...(log.acao === 'LOGIN' ? s.badgeBlue : s.badgeGreen) }}>
                  {log.acao}
                </span>
              </td>
              <td style={s.td}>{new Date(log.dataHora).toLocaleString('pt-BR')}</td>
              <td style={s.td}>{log.detalhes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagina && pagina.totalPages > 1 && (
        <div style={s.pagination}>
          <button style={s.pgBtn} disabled={page === 0} onClick={() => setPage(page - 1)}>
            ← Anterior
          </button>
          <span style={{ fontSize: 13 }}>Página {page + 1} de {pagina.totalPages}</span>
          <button style={s.pgBtn} disabled={page >= pagina.totalPages - 1} onClick={() => setPage(page + 1)}>
            Próxima →
          </button>
        </div>
      )}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#0c1f0e', borderRadius: 8 },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #1a3a1e', fontSize: 13, color: '#4a7c52' },
  td: { padding: '10px 12px', borderBottom: '1px solid #112214', fontSize: 13, color: '#a5d6a7' },
  badge: { padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 'bold' },
  badgeBlue: { backgroundColor: 'rgba(76,175,80,0.15)', color: '#81c784' },
  badgeGreen: { backgroundColor: 'rgba(249,168,37,0.15)', color: '#f9a825' },
  pagination: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, justifyContent: 'center', color: '#a5d6a7' },
  pgBtn: { padding: '6px 14px', border: '1px solid #1a3a1e', borderRadius: 4, cursor: 'pointer', backgroundColor: '#0c1f0e', color: '#81c784' },
}
