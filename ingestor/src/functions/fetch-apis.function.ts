import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const REGISTRY_URL = process.env.REGISTRY_URL || 'https://pikku-registry.fly.dev'

export const FetchApisInput = z.object({
  offset: z.number().default(0),
  limit: z.number().default(200),
})

export const ApiEntry = z.object({
  name: z.string(),
  provider: z.string(),
  service: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  swaggerUrl: z.string(),
  swaggerYamlUrl: z.string().optional(),
  categories: z.array(z.string()).optional(),
  totalOperations: z.number().optional(),
  servers: z.array(z.string()).optional(),
})

export const FetchApisOutput = z.object({
  apis: z.array(ApiEntry),
  total: z.number(),
})

export const fetchApis = pikkuSessionlessFunc({
  description: 'Fetch API list from the pikku registry',
  input: FetchApisInput,
  output: FetchApisOutput,
  func: async ({ logger }, data) => {
    const url = `${REGISTRY_URL}/api/openapis?limit=${data.limit}&offset=${data.offset}`
    logger.info(`Fetching APIs from ${url}`)
    const res = await fetch(url)
    const json = (await res.json()) as { apis: any[]; total: number }
    return { apis: json.apis, total: json.total }
  },
})
