import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscriptGetInput = z.object({
  transcriptId: z.string().describe('The transcript ID'),
})

export const TranscriptGetOutput = z.object({
  id: z.string(),
  status: z.string(),
  audioUrl: z.string(),
  text: z.string().nullable(),
  error: z.string().nullable(),
  audioDuration: z.number().nullable(),
})

export const getTranscript = pikkuSessionlessFunc({
  description: 'Gets a transcript by ID',
  node: { displayName: 'Get Transcript', category: 'Transcript', type: 'action' },
  input: TranscriptGetInput,
  output: TranscriptGetOutput,
  func: async ({ assemblyai }, { transcriptId }) => {
    const result = await assemblyai.getTranscript(transcriptId)
    return {
      id: result.id,
      status: result.status,
      audioUrl: result.audio_url,
      text: result.text,
      error: result.error,
      audioDuration: result.audio_duration,
    }
  },
})
