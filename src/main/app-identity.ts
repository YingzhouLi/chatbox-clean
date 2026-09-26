import path from 'node:path'
import { app } from 'electron'

/** Identity used by the AdvancedAI distribution of Chatbox Community Edition. */
export const ADVANCEDAI_APP_NAME = 'advancedai'
export const ADVANCEDAI_APP_ID = 'com.advancedsolver.advancedai'

function hasExplicitUserDataDirectory(): boolean {
  return process.argv.some((argument) => argument === '--user-data-dir' || argument.startsWith('--user-data-dir='))
}

/**
 * Keep AdvancedAI's profile isolated from the official Chatbox installation.
 * Electron normally derives this path from the package name, but setting it
 * explicitly also keeps development and packaged builds consistent.
 */
export function configureAdvancedAIAppIdentity(): void {
  app.setName(ADVANCEDAI_APP_NAME)

  // Test and QA harnesses intentionally provide their own isolated profile.
  if (hasExplicitUserDataDirectory()) {
    return
  }

  const userDataPath = path.join(app.getPath('appData'), ADVANCEDAI_APP_NAME)
  if (path.resolve(app.getPath('userData')) !== path.resolve(userDataPath)) {
    app.setPath('userData', userDataPath)
  }
}
