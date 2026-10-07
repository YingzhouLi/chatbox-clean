import { getMetaStorage } from '@/stores/sessionHelpers'

export async function initData() {
  // AdvancedAI starts with an empty workspace. Keep this initialization hook so
  // migration ordering remains compatible with upstream Chatbox, but do not
  // persist Chatbox's sample conversations on a new installation.
  const metaStorage = await getMetaStorage()
  await metaStorage.getAllTotal()
}
