import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscriptDeleteInput = z.object({
  transcriptId: z.string().describe('The transcript ID to delete'),
})

export const TranscriptDeleteOutput = z.object({
  id: z.string(),
  status: z.string(),
})

export const deleteTranscript = pikkuSessionlessFunc({
  description: 'Deletes a transcript by ID',
  node: { displayName: 'Delete Transcript', category: 'Transcript', type: 'action' },
  input: TranscriptDeleteInput,
  output: TranscriptDeleteOutput,
  func: async ({ assemblyai }, { transcriptId }) => {
    const result = await assemblyai.deleteTranscript(transcriptId)
    return {
      id: result.id,
      status: result.status,
    }
  },
})
