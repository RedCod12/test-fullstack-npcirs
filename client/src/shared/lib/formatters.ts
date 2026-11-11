export const formatMoney = (value?: number) => 
    (value == null ? '—' : `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value)} ₽`)

export const formatDate = (value?: string) => 
    (value ? new Date(`${value}T00:00:00`).toLocaleDateString('ru-RU') : '—')
export const formatNumber = (value?: number) => 
    (new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value ?? 0))
