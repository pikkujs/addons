import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscribeVerboseInput = z.object({
  contentKey: z.string().describe('The content key for the audio file in the content service'),
  fileName: z.string().describe('The file name with extension (e.g. "audio.wav")'),
  language: z.string().optional().describe('Language code (e.g. "en", "es", "fr")'),
})

const SegmentSchema = z.object({
  start: z.number().describe('Start time in seconds'),
  end: z.number().describe('End time in seconds'),
  text: z.string().describe('Transcribed text for this segment'),
})

export const TranscribeVerboseOutput = z.object({
  text: z.string().describe('The full transcribed text'),
  language: z.string().describe('The detected or specified language'),
  segments: z.array(SegmentSchema).describe('Transcription segments with timestamps'),
})

export const transcribeVerbose = pikkuSessionlessFunc({
  description: 'Transcribe audio with timestamps and segments using Whisper ASR',
  node: { displayName: 'Transcribe Audio (Verbose)', category: 'Speech', type: 'action' },
  input: TranscribeVerboseInput,
  output: TranscribeVerboseOutput,
  func: async ({ whisperASR, content }, data) => {
    const stream = await content.readFile(data.contentKey)
    const chunks: Uint8Array[] = []
    for await (const chunk of stream as AsyncIterable<Uint8Array>) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    const result = await whisperASR.transcribe(buffer, data.fileName, {
      output: 'json',
      task: 'transcribe',
      language: data.language,
    })

    return {
      text: result.text,
      language: result.language,
      segments: (result.segments ?? []).map((s: any) => ({
        start: s.start,
        end: s.end,
        text: s.text,
      })),
    }
  },
})
