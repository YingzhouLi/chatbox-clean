import { describe, expect, it } from 'vitest'

import { getHomeWelcomeCardMode } from './homeWelcomeCard'

describe('getHomeWelcomeCardMode', () => {
  it('never exposes Chatbox AI account or upgrade cards', () => {
    expect(
      getHomeWelcomeCardMode({
        providerCount: 0,
        isLoggedIn: true,
        hasLicense: false,
        hasExpiredLicense: true,
      })
    ).toBe('none')
  })
})
