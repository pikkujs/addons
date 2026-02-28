import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetRedactedAudioInput = z.object({
  transcriptId: z.string().describe('The transcript ID (must have been created with redact_pii enabled)'),
})

export const GetRedactedAudioOutput = z.object({
  status: z.string(),
  redactedAudioUrl: z.string(),
})

export const getRedactedAudio = pikkuSessionlessFunc({
  description: 'Gets the redacted audio URL for a PII-redacted transcript',
  node: { displayName: 'Get Redacted Audio', category: 'Transcript', type: 'action' },
  input: GetRedactedAudioInput,
  output: GetRedactedAudioOutput,
  func: async ({ assemblyai }, { transcriptId }) => {
    const result = await assemblyai.getRedactedAudio(transcriptId)
    return {
      status: result.status,
      redactedAudioUrl: result.redacted_audio_url,
    }
  },
})
