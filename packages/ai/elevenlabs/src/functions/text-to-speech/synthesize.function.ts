import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const DEFAULT_VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb'

export const SynthesizeInput = z.object({
  text: z.string().describe('Text to synthesize into speech'),
  voice: z.string().optional().describe('ElevenLabs voice ID'),
  format: z.string().optional().describe('Output audio format'),
})

export const SynthesizeOutput = z.object({
  audio: z.string().describe('Base64-encoded audio data'),
  format: z.string().describe('Audio format'),
})

export const synthesize = pikkuSessionlessFunc({
  description: 'Synthesizes text to speech using ElevenLabs text-to-speech',
  node: {
    displayName: 'Synthesize Speech',
    category: 'Speech',
    type: 'action',
  },
  input: SynthesizeInput,
  output: SynthesizeOutput,
  func: async ({ elevenlabs }, data) => {
    const voiceId = data.voice || DEFAULT_VOICE_ID
    const outputFormat = data.format || 'mp3_44100_128'

    const audioBuffer = await elevenlabs.textToSpeech(voiceId, {
      text: data.text,
      model_id: 'eleven_multilingual_v2',
      output_format: outputFormat,
    })

    const bytes = new Uint8Array(audioBuffer)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]!)
    }
    const audioBase64 = btoa(binary)

    return { audio: audioBase64, format: 'mp3' }
  },
})
