import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetSentencesInput = z.object({
  transcriptId: z.string().describe('The transcript ID'),
})

export const GetSentencesOutput = z.object({
  id: z.string(),
  confidence: z.number(),
  audioDuration: z.number(),
  sentences: z.array(z.object({
    text: z.string(),
    start: z.number(),
    end: z.number(),
    confidence: z.number(),
  })),
})

export const getSentences = pikkuSessionlessFunc({
  description: 'Gets sentences from a completed transcript',
  node: { displayName: 'Get Sentences', category: 'Transcript', type: 'action' },
  input: GetSentencesInput,
  output: GetSentencesOutput,
  func: async ({ assemblyai }, { transcriptId }) => {
    const result = await assemblyai.getSentences(transcriptId)
    return {
      id: result.id,
      confidence: result.confidence,
      audioDuration: result.audio_duration,
      sentences: result.sentences.map((s) => ({
        text: s.text,
        start: s.start,
        end: s.end,
        confidence: s.confidence,
      })),
    }
  },
})
