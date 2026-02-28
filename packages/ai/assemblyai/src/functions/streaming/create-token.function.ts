import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateStreamingTokenInput = z.object({
  expiresInSeconds: z.number().min(1).max(600).describe('Token expiration time in seconds (1-600)'),
  maxSessionDurationSeconds: z.number().optional().describe('Maximum session duration in seconds (defaults to 10800)'),
})

export const CreateStreamingTokenOutput = z.object({
  token: z.string(),
  expiresInSeconds: z.number(),
})

export const createStreamingToken = pikkuSessionlessFunc({
  description: 'Creates a temporary token for client-side real-time streaming transcription',
  node: { displayName: 'Create Streaming Token', category: 'Streaming', type: 'action' },
  input: CreateStreamingTokenInput,
  output: CreateStreamingTokenOutput,
  func: async ({ assemblyai }, { expiresInSeconds, maxSessionDurationSeconds }) => {
    const result = await assemblyai.createStreamingToken(expiresInSeconds, maxSessionDurationSeconds)
    return {
      token: result.token,
      expiresInSeconds: result.expires_in_seconds,
    }
  },
})
