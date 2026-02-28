import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetSubtitlesInput = z.object({
  transcriptId: z.string().describe('The transcript ID'),
  format: z.enum(['srt', 'vtt']).describe('Subtitle format'),
  charsPerCaption: z.number().optional().describe('Maximum characters per caption'),
})

export const GetSubtitlesOutput = z.object({
  subtitles: z.string().describe('Subtitle content in the requested format'),
})

export const getSubtitles = pikkuSessionlessFunc({
  description: 'Gets subtitles from a completed transcript in SRT or VTT format',
  node: { displayName: 'Get Subtitles', category: 'Transcript', type: 'action' },
  input: GetSubtitlesInput,
  output: GetSubtitlesOutput,
  func: async ({ assemblyai }, { transcriptId, format, charsPerCaption }) => {
    const subtitles = await assemblyai.getSubtitles(transcriptId, format, charsPerCaption)
    return { subtitles }
  },
})
