export interface QdrantConfig {
  url: string
  apiKey?: string
}

export interface QdrantMatch {
  id: string | number
  score: number
  payload: Record<string, unknown>
}

/**
 * Minimal typed wrapper over Qdrant's REST API — dep-free (plain `fetch`) so the
 * addon carries no SDK. `api-key` auth is sent only when a key is configured
 * (local Qdrant is unauthenticated).
 */
export async function qdrantFetch(
  config: QdrantConfig,
  path: string,
  body: unknown
): Promise<unknown> {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  }
  if (config.apiKey) headers['api-key'] = config.apiKey
  const res = await fetch(`${config.url.replace(/\/$/, '')}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`Qdrant request failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

interface QdrantSearchResponse {
  result?: Array<{
    id: string | number
    score: number
    payload?: Record<string, unknown> | null
  }>
}

export async function qdrantSearch(
  config: QdrantConfig,
  collection: string,
  vector: number[],
  topK: number
): Promise<QdrantMatch[]> {
  const body = (await qdrantFetch(
    config,
    `/collections/${encodeURIComponent(collection)}/points/search`,
    { vector, limit: topK, with_payload: true }
  )) as QdrantSearchResponse
  return (body.result ?? []).map((hit) => ({
    id: hit.id,
    score: hit.score,
    payload: hit.payload ?? {},
  }))
}
