import type { BrowserWindow } from 'electron'
import log from 'electron-log/main'

/**
 * Deep-link schemes supported by AdvancedAI.
 *
 * `chatbox://` is kept for compatibility with existing AILauncher imports,
 * while `advancedai://` is the preferred scheme so an installed official
 * Chatbox can continue to own its own `chatbox://` handler.
 */
const SUPPORTED_PROTOCOLS = new Set(['chatbox:', 'chatbox-dev:', 'advancedai:', 'advancedai-dev:'])

export function isSupportedDeepLink(link: string): boolean {
  try {
    return SUPPORTED_PROTOCOLS.has(new URL(link).protocol)
  } catch {
    return false
  }
}

export function normalizeDeepLink(link: string): string {
  return link.replace(/^chatbox-dev:\/\//, 'chatbox://').replace(/^advancedai-dev:\/\//, 'advancedai://')
}

export function handleDeepLink(mainWindow: BrowserWindow, link: string) {
  if (!isSupportedDeepLink(link)) {
    log.warn('Ignoring unsupported deep link:', link)
    return
  }

  const url = new URL(normalizeDeepLink(link))

  log.info('🔗 Parsed URL:', { hostname: url.hostname, pathname: url.pathname })

  // handle `chatbox://mcp/install?server=`
  if (url.hostname === 'mcp' && url.pathname === '/install') {
    const encodedConfig = url.searchParams.get('server') || ''
    mainWindow.webContents.send('navigate-to', `/settings/mcp?install=${encodeURIComponent(encodedConfig)}`)
  }

  // handle `chatbox://provider/import?config=`
  if (url.hostname === 'provider' && url.pathname === '/import') {
    const encodedConfig = url.searchParams.get('config') || ''
    const auto = url.protocol === 'advancedai:' && url.searchParams.get('auto') === '1' ? '&auto=1' : ''
    mainWindow.webContents.send('navigate-to', `/settings/provider?import=${encodeURIComponent(encodedConfig)}${auto}`)
  }

  // handle `chatbox://auth/callback?ticket_id=xxx&status=success`
  // // 不需要，实际跳回到 app 后业务hooks useLogin 会处理后续动作
  // if (url.hostname === 'auth' && url.pathname === '/callback') {
  //   const ticketId = url.searchParams.get('ticket_id') || ''
  //   const status = url.searchParams.get('status') || ''
  //   log.info('✅ Auth callback received:', { ticketId, status })
  //   mainWindow.webContents.send('navigate-to', `/settings/provider/chatbox-ai?ticket_id=${ticketId}&status=${status}`)
  // }
}
