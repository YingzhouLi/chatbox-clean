import { CHATBOX_AI_PARSER_LICENSE_KEY_REQUIRED_ERROR } from '@shared/file-parse-errors'
import { ChatboxAIAPIError } from '@shared/models/errors'

export const CHATBOX_AI_PARSER_SIGN_IN_ONLY_I18N_KEY =
  '<OpenSettingButton>Sign in to Chatbox AI</OpenSettingButton> to use your account license.'

export function getFileParseErrorI18nKey(errorCode: string, _isDesktopLike: boolean): string | undefined {
  // AdvancedAI never offers the retired Chatbox cloud parser or its account
  // flow. Keep the legacy constant exported for persisted-error compatibility,
  // but do not return a sign-in/upgrade message for it on any platform.
  if (errorCode === CHATBOX_AI_PARSER_LICENSE_KEY_REQUIRED_ERROR) return undefined
  return ChatboxAIAPIError.codeNameMap[errorCode]?.i18nKey
}
