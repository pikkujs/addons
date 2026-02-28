import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscribeInput = z.object({
  contentKey: z.string().describe('The content key for the audio file in the content service'),
  fileName: z.string().describe('The file name with extension (e.g. "audio.wav")'),
  language: z.string().optional().describe('Language code (e.g. "en", "es", "fr")'),
})

export const TranscribeOutput = z.object({
  text: z.string().describe('The transcribed text'),
})

export const transcribe = pikkuSessionlessFunc({
  description: 'Transcribe audio to text using Whisper ASR',
  node: { displayName: 'Transcribe Audio', category: 'Speech', type: 'action' },
  input: TranscribeInput,
  output: TranscribeOutput,
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

    return { text: result.text }
  },
})
