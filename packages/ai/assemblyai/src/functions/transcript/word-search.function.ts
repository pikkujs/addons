import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WordSearchInput = z.object({
  transcriptId: z.string().describe('The transcript ID'),
  words: z.array(z.string()).describe('Words to search for in the transcript'),
})

export const WordSearchOutput = z.object({
  id: z.string(),
  totalCount: z.number(),
  matches: z.array(z.object({
    text: z.string(),
    count: z.number(),
    timestamps: z.array(z.object({
      start: z.number(),
      end: z.number(),
    })),
  })),
})

export const wordSearch = pikkuSessionlessFunc({
  description: 'Searches for words in a completed transcript',
  node: { displayName: 'Word Search', category: 'Transcript', type: 'action' },
  input: WordSearchInput,
  output: WordSearchOutput,
  func: async ({ assemblyai }, { transcriptId, words }) => {
    const result = await assemblyai.wordSearch(transcriptId, words)
    return {
      id: result.id,
      totalCount: result.total_count,
      matches: result.matches.map((m) => ({
        text: m.text,
        count: m.count,
        timestamps: m.timestamps.map((t) => ({
          start: t.start,
          end: t.end,
        })),
      })),
    }
  },
})
