import { Grid, Stack, Text } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useMyCopilots } from '@/hooks/useCopilots'
import CopilotItem from './-components/CopilotItem'

const searchSchema = z.object({
  q: z.string().optional(),
})

export const Route = createFileRoute('/copilots/search' as never)({
  component: CopilotSearch,
  validateSearch: zodValidator(searchSchema),
})

function CopilotSearch() {
  const { t } = useTranslation()
  const { copilots: myCopilots } = useMyCopilots()
  const searchParams = Route.useSearch() as { q?: string }

  const term = (searchParams.q ?? '').trim()
  const normalizedTerm = term.toLowerCase()

  const filteredMyCopilots = useMemo(() => {
    return myCopilots.filter(
      (copilot) =>
        copilot.name.toLowerCase().includes(normalizedTerm) ||
        copilot.prompt.toLowerCase().includes(normalizedTerm) ||
        copilot.description?.toLowerCase().includes(normalizedTerm)
    )
  }, [myCopilots, normalizedTerm])

  return (
    <Stack px="sm" py="xl" gap="lg" className="max-w-7xl">
      {filteredMyCopilots.length > 0 && (
        <Stack gap="md">
          <Text>{t('My Created & Added Copilots')}</Text>

          <Grid gutter="xs" align="stretch">
            {filteredMyCopilots.map((copilot) => (
              <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }} key={copilot.id}>
                <CopilotItem copilot={copilot} type="local" highlightTerm={term} />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      )}

      {filteredMyCopilots.length === 0 && (
        <div className="py-12 text-center">
          <Text c="dimmed" size="sm">
            {term ? t('No copilots matched your search.') : t('No copilots yet. Create your first one!')}
          </Text>
        </div>
      )}
    </Stack>
  )
}

export default CopilotSearch
