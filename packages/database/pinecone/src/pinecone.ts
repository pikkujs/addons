export interface PineconeConfig {
  host: string
  apiKey: string
}

export interface PineconeMatch {
  id: string | number
  score: number
  payload: Record<string, unknown>
}

/**
 * Minimal typed wrapper over Pinecone's REST data plane — dep-free (plain
 * `fetch`) so the addon carries no SDK. Each Pinecone index has its own host;
 * `Api-Key` auth is always required.
 */
export async function pineconeFetch(
  config: PineconeConfig,
  path: string,
  body: unknown
): Promise<unknown> {
  const res = await fetch(`${config.host.replace(/\/$/, '')}${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Api-Key': config.apiKey,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`Pinecone request failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

interface PineconeQueryResponse {
  matches?: Array<{
    id: string | number
    score: number
    metadata?: Record<string, unknown> | null
  }>
}

export async function pineconeQuery(
  config: PineconeConfig,
  namespace: string,
  vector: number[],
  topK: number
): Promise<PineconeMatch[]> {
  const body = (await pineconeFetch(config, `/query`, {
    vector,
    topK,
    namespace,
    includeMetadata: true,
  })) as PineconeQueryResponse
  return (body.matches ?? []).map((hit) => ({
    id: hit.id,
    score: hit.score,
    payload: hit.metadata ?? {},
  }))
}
