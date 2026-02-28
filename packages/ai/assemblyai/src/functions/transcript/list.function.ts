import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscriptListInput = z.object({
  limit: z.number().optional().describe('Maximum number of transcripts to return'),
  status: z.string().optional().describe('Filter by status (queued, processing, completed, error)'),
  beforeId: z.string().optional().describe('Return transcripts created before this ID'),
  afterId: z.string().optional().describe('Return transcripts created after this ID'),
})

export const TranscriptListOutput = z.object({
  transcripts: z.array(z.object({
    id: z.string(),
    status: z.string(),
    audioUrl: z.string(),
    created: z.string(),
    completed: z.string().nullable(),
  })),
})

export const listTranscripts = pikkuSessionlessFunc({
  description: 'Lists all transcripts',
  node: { displayName: 'List Transcripts', category: 'Transcript', type: 'action' },
  input: TranscriptListInput,
  output: TranscriptListOutput,
  func: async ({ assemblyai }, data) => {
    const result = await assemblyai.listTranscripts({
      limit: data.limit,
      status: data.status,
      before_id: data.beforeId,
      after_id: data.afterId,
    })
    return {
      transcripts: result.transcripts.map((t) => ({
        id: t.id,
        status: t.status,
        audioUrl: t.audio_url,
        created: t.created,
        completed: t.completed,
      })),
    }
  },
})
