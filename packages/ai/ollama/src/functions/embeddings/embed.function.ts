import { z } from 'zod'
import { embed } from 'ai'
import { pikkuSessionlessFunc } from '#pikku'

export const OllamaEmbedInput = z.object({
  model: z.string().describe('The Ollama embedding model to use (e.g. "nomic-embed-text", "mxbai-embed-large")'),
  value: z.string().describe('The text to embed'),
})

export const UsageSchema = z.object({
  tokens: z.number().describe('Number of tokens used'),
})

export const OllamaEmbedOutput = z.object({
  embedding: z.array(z.number()).describe('The embedding vector'),
  usage: UsageSchema.describe('Token usage statistics'),
})

type Output = z.infer<typeof OllamaEmbedOutput>

export const ollamaEmbed = pikkuSessionlessFunc({
  description: 'Create an embedding vector from text using an Ollama model',
  node: { displayName: 'Embed Text', category: 'Embeddings', type: 'action' },
  input: OllamaEmbedInput,
  output: OllamaEmbedOutput,
  func: async ({ ollama }, data) => {
    const result = await embed({
      model: ollama.embedding(data.model),
      value: data.value,
    })
    return {
      embedding: result.embedding,
      usage: result.usage,
    } as Output
  },
})
