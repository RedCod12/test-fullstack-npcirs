import {
  Building2,
  Users,
  Wallet,
  TrendingUp,
} from 'lucide-react'

import { formatNumber } from '@/shared/lib'
import type { Stats } from './types'

//??

export const getStatsCards = (data?: Stats) => [
  {
    id: 'departments',
    label: 'Подразделений',
    value: formatNumber(data?.departments),
    icon: Building2,
    gradient: 'linear-gradient(195deg,#42424a,#191919)',
  },
  {
    id: 'employees',
    label: 'Сотрудников',
    value: formatNumber(data?.employees),
    icon: Users,
    gradient: 'linear-gradient(195deg,#49a3f1,#1a73e8)',
  },
  {
    id: 'budget',
    label: 'Общий бюджет',
    value: `${formatNumber(data?.budget)} ₽`,
    icon: Wallet,
    gradient: 'linear-gradient(195deg,#66bb6a,#43a047)',
  },
  {
    id: 'avgSalary',
    label: 'Средний оклад',
    value: `${formatNumber(data?.avg_salary)} ₽`,
    icon: TrendingUp,
    gradient: 'linear-gradient(195deg,#ec407a,#d81b60)',
  },
]