import deepmerge from 'deepmerge'
import { createDefaultSettings } from './settings-defaults'
import { type Settings, SettingsSchema } from './settings-schema'

export function mergeSettingsWithDefaults(persisted: unknown): Settings {
  const persistedSettings =
    persisted && typeof persisted === 'object' && !Array.isArray(persisted) ? (persisted as Partial<Settings>) : {}
  const mergedSettings = deepmerge<Settings, Partial<Settings>>(createDefaultSettings(), persistedSettings, {
    arrayMerge: (_target, source) => source,
  })
  // Migrate snapshots written by Chatbox before parsing. Keeping this at the
  // current-version merge path is important because persisted snapshots do
  // not always pass through a versioned migration.
  const extension = mergedSettings.extension as {
    documentParser?: { type?: string }
    webSearch?: { provider?: string }
  }
  if (extension.documentParser?.type === 'chatbox-ai' || extension.documentParser?.type === 'none') {
    extension.documentParser.type = 'local'
  }
  if (extension.webSearch?.provider === 'build-in') {
    extension.webSearch.provider = 'bing'
  }
  const parsedSettings = SettingsSchema.safeParse(mergedSettings)
  return parsedSettings.success ? parsedSettings.data : mergedSettings
}
