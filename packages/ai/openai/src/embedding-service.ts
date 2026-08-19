import type { AIEmbeddingService } from '@pikku/core/services'
import type OpenAI from 'openai'

const DEFAULT_MODEL = 'text-embedding-3-small'

/**
 * An {@link AIEmbeddingService} backed by the OpenAI embeddings API.
 *
 * Construct one with an OpenAI client and (optionally) a model, then wire it
 * into `singletonServices.aiEmbedding`. Vector-store addons embed against it at
 * both index and query time; pinning the model here guarantees the two share
 * one vector space.
 */
export class OpenAIEmbeddingService implements AIEmbeddingService {
  readonly model: string
  readonly dimensions?: number

  constructor(
    private readonly openai: OpenAI,
    options: { model?: string; dimensions?: number } = {}
  ) {
    this.model = options.model ?? DEFAULT_MODEL
    this.dimensions = options.dimensions
  }

  async embedQuery(value: string): Promise<number[]> {
    const [vector] = await this.embedDocuments([value])
    return vector
  }

  async embedDocuments(values: string[]): Promise<number[][]> {
    if (values.length === 0) return []
    const result = await this.openai.embeddings.create({
      model: this.model,
      input: values,
      ...(this.dimensions ? { dimensions: this.dimensions } : {}),
    })
    return result.data.map((d) => d.embedding)
  }
}
