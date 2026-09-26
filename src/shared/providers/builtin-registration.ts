/**
 * Ordered side-effect entrypoint for the built-in provider registry.
 *
 * Preserve this import order: the registry's Map order is also the default
 * provider display order. Chatbox AI remains in the source tree for protocol
 * and migration compatibility, but is intentionally not registered in the
 * AdvancedAI build.
 */
import './definitions/openai'
import './definitions/openai-responses'
import './definitions/gemini'
import './definitions/claude'
import './definitions/deepseek'
import './definitions/qwen'
import './definitions/qwen-portal'
import './definitions/minimax'
import './definitions/moonshot'
import './definitions/siliconflow'
import './definitions/openrouter'
import './definitions/ollama'
import './definitions/lmstudio'
import './definitions/azure'
import './definitions/groq'
import './definitions/xai'
import './definitions/mistral-ai'
import './definitions/perplexity'
import './definitions/volcengine'
import './definitions/chatglm'
import './definitions/github-copilot'
import './definitions/opencode-go'
import './definitions/opencode-zen'
import './definitions/bedrock'
import './definitions/vercel-ai-gateway'
import './definitions/tencent-hunyuan'
import './definitions/xiaomi-mimo'
import './definitions/longcat'
import './definitions/zhipu-glm-coding-plan'
