import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AudioTranscribeInput = z.object({
  audioUrl: z.string().url().describe('URL of the audio file to transcribe'),
  model: z
    .string()
    .default('voxtral-mini-latest')
    .describe('Speech-to-text model id (e.g. voxtral-mini-latest)'),
  language: z
    .string()
    .optional()
    .describe("Language hint, e.g. 'en' — providing it can boost accuracy"),
})

export const AudioTranscribeOutput = z.object({
  model: z.string(),
  text: z.string().describe('The transcribed text'),
  language: z.string().nullable().describe('Detected (or provided) language'),
})

type Input = z.infer<typeof AudioTranscribeInput>
type Output = z.infer<typeof AudioTranscribeOutput>

export const audioTranscribe = pikkuSessionlessFunc({
  description: 'Transcribe an audio file to text using a Mistral (Voxtral) model',
  node: { displayName: 'Transcribe Audio', category: 'Audio', type: 'action' },
  input: AudioTranscribeInput,
  output: AudioTranscribeOutput,
  func: async ({ mistral }, data: Input) => {
    const res = await mistral.audio.transcriptions.complete({
      model: data.model,
      fileUrl: data.audioUrl,
      language: data.language,
    })
    return { model: res.model, text: res.text, language: res.language } satisfies Output
  },
})
