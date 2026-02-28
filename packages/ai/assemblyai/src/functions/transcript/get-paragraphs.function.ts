import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetParagraphsInput = z.object({
  transcriptId: z.string().describe('The transcript ID'),
})

export const GetParagraphsOutput = z.object({
  id: z.string(),
  confidence: z.number(),
  audioDuration: z.number(),
  paragraphs: z.array(z.object({
    text: z.string(),
    start: z.number(),
    end: z.number(),
    confidence: z.number(),
  })),
})

export const getParagraphs = pikkuSessionlessFunc({
  description: 'Gets paragraphs from a completed transcript',
  node: { displayName: 'Get Paragraphs', category: 'Transcript', type: 'action' },
  input: GetParagraphsInput,
  output: GetParagraphsOutput,
  func: async ({ assemblyai }, { transcriptId }) => {
    const result = await assemblyai.getParagraphs(transcriptId)
    return {
      id: result.id,
      confidence: result.confidence,
      audioDuration: result.audio_duration,
      paragraphs: result.paragraphs.map((p) => ({
        text: p.text,
        start: p.start,
        end: p.end,
        confidence: p.confidence,
      })),
    }
  },
})
