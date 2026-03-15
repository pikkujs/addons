import { z } from 'zod'
import { embedMany } from 'ai'
import { pikkuSessionlessFunc } from '#pikku'

export const OllamaEmbedManyInput = z.object({
  model: z.string().describe('The Ollama embedding model to use (e.g. "nomic-embed-text", "mxbai-embed-large")'),
  values: z.array(z.string()).describe('The texts to embed'),
})

export const UsageSchema = z.object({
  tokens: z.number().describe('Number of tokens used'),
})

export const OllamaEmbedManyOutput = z.object({
  embeddings: z.array(z.array(z.number())).describe('The embedding vectors'),
  usage: UsageSchema.describe('Token usage statistics'),
})

type Output = z.infer<typeof OllamaEmbedManyOutput>

export const ollamaEmbedMany = pikkuSessionlessFunc({
  description: 'Create embedding vectors from multiple texts using an Ollama model',
  node: { displayName: 'Embed Multiple Texts', category: 'Embeddings', type: 'action' },
  input: OllamaEmbedManyInput,
  output: OllamaEmbedManyOutput,
  func: async ({ ollama }, data) => {
    const result = await embedMany({
      model: ollama.embedding(data.model),
      values: data.values,
    })
    return {
      embeddings: result.embeddings,
      usage: result.usage,
    } as Output
  },
})
