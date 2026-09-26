import { type ChatboxAILicenseDetail, type Session } from '@shared/types'
import { ADVANCEDAI_DEFAULT_MODEL_ID, ADVANCEDAI_PROVIDER_ID } from '@shared/defaults'

export type ChatboxLicenseDefaultModelId = NonNullable<ChatboxAILicenseDetail['defaultModel']>

type ChatboxLicenseDetailForDefaultModel = Pick<ChatboxAILicenseDetail, 'defaultModel' | 'type' | 'name' | 'plan'>

export type ChatboxDefaultModelSettings = {
  licenseKey?: string
  hasExpiredLicense?: boolean
  licenseDetail?: ChatboxLicenseDetailForDefaultModel
  licensePlanName?: string
}

export type DefaultChatModelSelection = {
  provider: string
  modelId: string
}

export function resolveChatboxLicenseDefaultModel(
  _settings: ChatboxDefaultModelSettings
): DefaultChatModelSelection | undefined {
  // Keep this compatibility function because existing session initialization
  // calls it, but never derive a model from a Chatbox AI license in AdvancedAI.
  return {
    provider: ADVANCEDAI_PROVIDER_ID,
    modelId: ADVANCEDAI_DEFAULT_MODEL_ID,
  }
}

export function applyChatboxLicenseDefaultModelToSession<T extends Pick<Session, 'type' | 'settings'>>(
  session: T,
  settings: ChatboxDefaultModelSettings
): T {
  if (session.type !== 'chat' || (session.settings?.provider && session.settings?.modelId)) {
    return session
  }

  const defaultModel = resolveChatboxLicenseDefaultModel(settings)
  if (!defaultModel) {
    return session
  }

  return {
    ...session,
    settings: {
      ...(session.settings || {}),
      ...defaultModel,
    },
  }
}
