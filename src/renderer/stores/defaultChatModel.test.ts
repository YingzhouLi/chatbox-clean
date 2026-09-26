import { describe, expect, it } from 'vitest'
import {
  applyChatboxLicenseDefaultModelToSession,
  type ChatboxDefaultModelSettings,
  resolveChatboxLicenseDefaultModel,
} from './defaultChatModel'

const cleanDefault = { provider: 'advancedsolver-one-api', modelId: 'gpt-6-sol' }

function makeSettings(overrides: Partial<ChatboxDefaultModelSettings> = {}): ChatboxDefaultModelSettings {
  return { hasExpiredLicense: false, ...overrides }
}

describe('AdvancedAI default model compatibility', () => {
  it('always resolves the AdvancedAI default without consulting Chatbox licenses', () => {
    expect(resolveChatboxLicenseDefaultModel(makeSettings())).toEqual(cleanDefault)
    expect(
      resolveChatboxLicenseDefaultModel(
        makeSettings({ licenseKey: 'legacy-license', hasExpiredLicense: true, licensePlanName: 'Chatbox AI Pro' })
      )
    ).toEqual(cleanDefault)
  })

  it('fills an unconfigured chat session with the AdvancedAI default', () => {
    const session = { type: 'chat' as const, settings: { temperature: 0.7 } }
    expect(applyChatboxLicenseDefaultModelToSession(session, makeSettings())).toEqual({
      type: 'chat',
      settings: { temperature: 0.7, ...cleanDefault },
    })
  })

  it('does not override an existing model or picture session', () => {
    const selected = { type: 'chat' as const, settings: { provider: 'openai', modelId: 'gpt-4o' } }
    expect(applyChatboxLicenseDefaultModelToSession(selected, makeSettings())).toBe(selected)

    const picture = { type: 'picture' as const, settings: undefined }
    expect(applyChatboxLicenseDefaultModelToSession(picture, makeSettings())).toBe(picture)
  })
})
