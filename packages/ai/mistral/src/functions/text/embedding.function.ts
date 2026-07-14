import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TextEmbeddingInput = z.object({
  input: z
    .union([z.string(), z.array(z.string())])
    .describe('Text to embed — a single string or an array to embed in one request'),
  model: z.string().default('mistral-embed').describe('Embedding model id (e.g. mistral-embed)'),
  outputDimension: z
    .number()
    .optional()
    .describe('Optionally truncate the embedding to this many dimensions'),
})

const EmbeddingData = z.object({
  object: z.string(),
  embedding: z.array(z.number()).describe('The embedding vector'),
  index: z.number().describe('Index of this embedding in the input list'),
})

const UsageInfo = z.object({
  promptTokens: z.number(),
  totalTokens: z.number(),
  completionTokens: z.number().nullable().optional(),
})

export const TextEmbeddingOutput = z.object({
  id: z.string(),
  object: z.string(),
  model: z.string(),
  data: z.array(EmbeddingData).describe('One embedding per input string'),
  usage: UsageInfo,
})

type Input = z.infer<typeof TextEmbeddingInput>
type Output = z.infer<typeof TextEmbeddingOutput>

export const textEmbedding = pikkuSessionlessFunc({
  description: 'Create embedding vectors for text using a Mistral embedding model',
  node: { displayName: 'Create Embedding', category: 'Text', type: 'action' },
  input: TextEmbeddingInput,
  output: TextEmbeddingOutput,
  func: async ({ mistral }, data: Input) => {
    const res = await mistral.embeddings.create({
      model: data.model,
      inputs: data.input,
      outputDimension: data.outputDimension,
    })
    return res as unknown as Output
  },
})
