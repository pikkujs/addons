import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscribeInput = z.object({
  audio: z.string().describe('Base64-encoded audio data'),
  language: z.string().optional().describe('Language code (e.g. "en", "es")'),
  format: z.string().optional().describe('Audio MIME type (e.g. "audio/wav")'),
})

export const TranscribeOutput = z.string().describe('Transcribed text')

export const transcribe = pikkuSessionlessFunc({
  description: 'Transcribes audio to text using ElevenLabs speech-to-text',
  node: {
    displayName: 'Transcribe Audio',
    category: 'Speech',
    type: 'action',
  },
  input: TranscribeInput,
  output: TranscribeOutput,
  func: async ({ elevenlabs }, data) => {
    const binaryString = atob(data.audio)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const result = await elevenlabs.speechToText(bytes, {
      model_id: 'scribe_v2',
      language_code: data.language,
    })

    return result.text
  },
})
