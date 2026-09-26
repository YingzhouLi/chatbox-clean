import type { ProviderModelInfo } from '@shared/types'
import { useQuery } from '@tanstack/react-query'
import type { ChatboxAIModelList } from '@/packages/remote'

const useChatboxAIModels = () => {
  // The Chatbox AI source remains available for compatibility, but AdvancedAI
  // must never contact Chatbox's remote manifest/model-list endpoints. Keep a
  // disabled query so existing consumers can continue to use the query state
  // fields without triggering a request.
  const query = useQuery({
    queryKey: ['chatbox-ai-models-disabled'],
    queryFn: async () => null,
    enabled: false,
    initialData: null,
  })

  return {
    allChatboxAIModels: [] as ProviderModelInfo[],
    chatboxAIModels: [] as ProviderModelInfo[],
    chatboxAIImageModels: [] as ProviderModelInfo[],
    chatboxAIModelList: null as ChatboxAIModelList | null,
    ...query,
  }
}

export default useChatboxAIModels
