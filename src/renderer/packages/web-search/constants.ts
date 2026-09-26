export const WEB_SEARCH_PROVIDERS = [
  { value: 'bing', label: 'Bing Search' },
  { value: 'tavily', label: 'Tavily' },
  { value: 'bocha', label: 'BoCha' },
  { value: 'querit', label: 'Querit' },
  { value: 'searxng', label: 'SearXNG' },
] as const

// `build-in` is retained only as a legacy value for imported settings. It is
// normalized to Bing and is intentionally absent from all user-facing lists.
export type WebSearchProviderValue = (typeof WEB_SEARCH_PROVIDERS)[number]['value'] | 'build-in'
