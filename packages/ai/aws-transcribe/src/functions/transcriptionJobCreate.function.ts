import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TranscriptionJobCreateInput = z.object({
  TranscriptionJobName: z.string().optional(),
  LanguageCode: z.string().optional(),
  MediaFileUri: z.string().optional(),
  IdentifyLanguage: z.boolean().optional(),
})

export const TranscriptionJobCreateOutput = z.object({
  TranscriptionJobName: z.string().optional(),
  TranscriptionJobStatus: z.string().optional(),
})

export const transcriptionJobCreate = pikkuSessionlessFunc({
  description: "Create a transcription job",
  input: TranscriptionJobCreateInput,
  output: TranscriptionJobCreateOutput,
  func: async ({ awsTranscribe }, data) => {
    return awsTranscribe.call("POST", "/StartTranscriptionJob", data) as any
  },
})
