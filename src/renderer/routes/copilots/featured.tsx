import { Stack, Text } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/copilots/featured')({
  component: FeaturedCopilots,
})

function FeaturedCopilots() {
  const { t } = useTranslation()

  return (
    <Stack px="sm" py="xl" gap="lg" className="max-w-7xl">
      <div className="py-12 text-center">
        <Text c="dimmed" size="sm">
          {t('No featured copilots available.')}
        </Text>
      </div>
    </Stack>
  )
}
