import { Building2, LayoutDashboard, type LucideIcon } from 'lucide-react'

export type Page = 'overview' | 'directory' | 'about'

export const SIDEBAR_WIDTH = 268

export const NAV_ITEMS = [
  { id: 'overview', label: 'Обзор', icon: LayoutDashboard },
  { id: 'directory', label: 'Отделы и сотрудники', icon: Building2 },
] as const satisfies ReadonlyArray<{
  id: Page
  label: string
  icon: LucideIcon
}>
