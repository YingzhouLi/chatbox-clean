export type HomeWelcomeCardMode = 'none' | 'login' | 'no-license' | 'expired-license'

export function getHomeWelcomeCardMode(params: {
  providerCount: number
  isLoggedIn: boolean
  hasLicense: boolean
  hasExpiredLicense: boolean
  hideForStoreReview?: boolean
}): HomeWelcomeCardMode {
  // AdvancedAI does not expose Chatbox AI account, license, or upgrade prompts.
  void params
  return 'none'
}
