import { useEffect, useState } from 'react'
import api from '../../../services/api'
import { extrairMensagemErro } from '../../../utils'

interface Role {
  id: number
  nome: string
  descricao: string
}

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [editando, setEditando] = useState<Role | null>(null)
  const [erro, setErro] = useState('')

  useEffect(() => { carregar() }, [])

  async function carregar() {
    const { data } = await api.get<Role[]>('/admin/roles')
    setRoles(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    try {
      if (editando) {
        await api.put(`/admin/roles/${editando.id}`, { nome, descricao })
      } else {
        await api.post('/admin/roles', { nome, descricao })
      }
      setNome('')
      setDescricao('')
      setEditando(null)
      carregar()
    } catch (err) {
      setErro(extrairMensagemErro(err, 'Erro ao salvar perfil'))
    }
  }

  function iniciarEdicao(role: Role) {
    setEditando(role)
    setNome(role.nome)
    setDescricao(role.descricao ?? '')
    setErro('')
  }

  function cancelar() {
    setEditando(null)
    setNome('')
    setDescricao('')
    setErro('')
  }

  async function deletar(id: number) {
    if (!confirm('Deseja remover este perfil?')) return
    try {
      await api.delete(`/admin/roles/${id}`)
      carregar()
    } catch (err) {
      setErro(extrairMensagemErro(err, 'Erro ao remover perfil'))
    }
  }

  return (
    <div style={{ padding: 28 }}>
      <h2 style={{ marginTop: 0 }}>Perfis (Roles)</h2>

      <div style={s.formCard}>
        <h4 style={{ margin: '0 0 12px' }}>{editando ? 'Editar perfil' : 'Novo perfil'}</h4>
        <form onSubmit={handleSubmit} style={s.form}>
          <input
            style={s.input}
            placeholder="Nome (ex: GERENTE)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            style={s.input}
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          {erro && <span style={{ color: 'red', fontSize: 13 }}>{erro}</span>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" style={s.btnPrimary}>
              {editando ? 'Salvar' : 'Adicionar'}
            </button>
            {editando && (
              <button type="button" style={s.btnSecondary} onClick={cancelar}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Nome</th>
            <th style={s.th}>Descrição</th>
            <th style={s.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td style={s.td}><strong>{role.nome}</strong></td>
              <td style={s.td}>{role.descricao}</td>
              <td style={s.td}>
                <button style={s.btnEdit} onClick={() => iniciarEdicao(role)}>Editar</button>
                <button style={s.btnDelete} onClick={() => deletar(role.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  formCard: { backgroundColor: '#0c1f0e', borderRadius: 8, padding: 20, marginBottom: 24, border: '1px solid #1a3a1e' },
  form: { display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400 },
  input: { padding: '8px 10px', borderRadius: 4, border: '1px solid #1a3a1e', fontSize: 14, backgroundColor: '#071409', color: '#e8f5e9' },
  btnPrimary: { padding: '8px 20px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  btnSecondary: { padding: '8px 20px', backgroundColor: '#1a3a1e', color: '#a5d6a7', border: 'none', borderRadius: 4, cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#0c1f0e', borderRadius: 8 },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #1a3a1e', fontSize: 13, color: '#4a7c52' },
  td: { padding: '10px 12px', borderBottom: '1px solid #112214', fontSize: 13, color: '#a5d6a7' },
  btnEdit: { marginRight: 8, padding: '4px 12px', backgroundColor: '#f9a825', color: '#071409', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 600 },
  btnDelete: { padding: '4px 12px', backgroundColor: '#c62828', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 },
}
