import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranslateInput = z.object({
  contentKey: z.string().describe('The content key for the audio file in the content service'),
  fileName: z.string().describe('The file name with extension (e.g. "audio.wav")'),
})

export const TranslateOutput = z.object({
  text: z.string().describe('The translated text in English'),
})

export const translate = pikkuSessionlessFunc({
  description: 'Translate audio to English using Whisper ASR',
  node: { displayName: 'Translate Audio', category: 'Speech', type: 'action' },
  input: TranslateInput,
  output: TranslateOutput,
  func: async ({ whisperASR, content }, data) => {
    const stream = await content.readFile(data.contentKey)
    const chunks: Uint8Array[] = []
    for await (const chunk of stream as AsyncIterable<Uint8Array>) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    const result = await whisperASR.transcribe(buffer, data.fileName, {
      output: 'json',
      task: 'translate',
    })

    return { text: result.text }
  },
})
