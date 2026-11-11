import {
  Box,
  Button,
  Card,
  Stack,
  Typography
} from '@mui/material'

import { getStatsCards, useStats } from '@/entities/stats'
import { PageHeader } from '@/shared/ui'
import { StatsCard } from '@/widgets/stats-card'

export function Overview() {
  const { data, isPending, isError, refetch } = useStats()

  return (
    <Stack spacing={3}>

      <PageHeader
        title="Обзор компании"
        description="Основные показатели по подразделениям и сотрудникам."
      />

      {isError && (
        <Card sx={{ p: 2 }}>
          <Typography color="error" variant="body2">Не удалось получить статистику.</Typography>
          <Button size="small" onClick={() => refetch()}>Повторить</Button>
        </Card>
      )}

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
        gap: 3, pt: 2
      }}>

        {getStatsCards(data).map(stat => (
          <StatsCard
            key={stat.id}
            {...stat}
            loading={isPending}
          />
        ))}
      </Box>
    </Stack>
  )
}

