import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscriptCreateInput = z.object({
  audioUrl: z.string().describe('URL of the audio file to transcribe'),
  languageCode: z.string().optional().describe('Language code (e.g. "en", "es")'),
  speakerLabels: z.boolean().optional().describe('Enable speaker diarization'),
  autoChapters: z.boolean().optional().describe('Enable auto chapters'),
  entityDetection: z.boolean().optional().describe('Enable entity detection'),
  sentimentAnalysis: z.boolean().optional().describe('Enable sentiment analysis'),
  autoHighlights: z.boolean().optional().describe('Enable auto highlights'),
  redactPii: z.boolean().optional().describe('Enable PII redaction'),
  redactPiiPolicies: z.array(z.string()).optional().describe('PII policies to redact'),
  webhookUrl: z.string().optional().describe('Webhook URL for completion notification'),
})

export const TranscriptCreateOutput = z.object({
  id: z.string(),
  status: z.string(),
  audioUrl: z.string(),
  text: z.string().nullable(),
  error: z.string().nullable(),
})

export const createTranscript = pikkuSessionlessFunc({
  description: 'Creates a new transcript from an audio URL',
  node: { displayName: 'Create Transcript', category: 'Transcript', type: 'action' },
  input: TranscriptCreateInput,
  output: TranscriptCreateOutput,
  func: async ({ assemblyai }, data) => {
    const result = await assemblyai.createTranscript({
      audio_url: data.audioUrl,
      language_code: data.languageCode,
      speaker_labels: data.speakerLabels,
      auto_chapters: data.autoChapters,
      entity_detection: data.entityDetection,
      sentiment_analysis: data.sentimentAnalysis,
      auto_highlights: data.autoHighlights,
      redact_pii: data.redactPii,
      redact_pii_policies: data.redactPiiPolicies,
      webhook_url: data.webhookUrl,
    })
    return {
      id: result.id,
      status: result.status,
      audioUrl: result.audio_url,
      text: result.text,
      error: result.error,
    }
  },
})
