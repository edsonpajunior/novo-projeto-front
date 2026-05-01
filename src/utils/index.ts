export function extrairMensagemErro(err: unknown, fallback = 'Erro inesperado'): string {
  return (err as { response?: { data?: { erro?: string } } })?.response?.data?.erro ?? fallback
}

export function formatarData(data: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(data))
}
