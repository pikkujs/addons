import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscriptionJobDeleteInput = z.object({
  TranscriptionJobName: z.string().optional(),
})

export const TranscriptionJobDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const transcriptionJobDelete = pikkuSessionlessFunc({
  description: "Delete a transcription job",
  input: TranscriptionJobDeleteInput,
  output: TranscriptionJobDeleteOutput,
  func: async ({ awsTranscribe }, data) => {
    return awsTranscribe.call("POST", "/DeleteTranscriptionJob", data) as any
  },
})
