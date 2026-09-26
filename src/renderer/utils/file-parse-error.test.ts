import { CHATBOX_AI_PARSER_LICENSE_KEY_REQUIRED_ERROR } from '@shared/file-parse-errors'
import { describe, expect, test } from 'vitest'
import { getFileParseErrorI18nKey } from './file-parse-error'

describe('getFileParseErrorI18nKey', () => {
  test('does not expose Chatbox sign-in or parser alternatives', () => {
    expect(getFileParseErrorI18nKey(CHATBOX_AI_PARSER_LICENSE_KEY_REQUIRED_ERROR, false)).toBeUndefined()
    expect(getFileParseErrorI18nKey(CHATBOX_AI_PARSER_LICENSE_KEY_REQUIRED_ERROR, true)).toBeUndefined()
  })

  test('uses the registered error key for other file parsing failures', () => {
    expect(getFileParseErrorI18nKey('chatbox_ai_parser_failed', false)).toBe(
      'Chatbox AI document parsing failed. Please try again later.'
    )
  })
})
