import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscriptionJobGetInput = z.object({
  TranscriptionJobName: z.string().optional(),
})

export const TranscriptionJobGetOutput = z.object({
  TranscriptionJobName: z.string().optional(),
  TranscriptionJobStatus: z.string().optional(),
})

export const transcriptionJobGet = pikkuSessionlessFunc({
  description: "Get a transcription job",
  input: TranscriptionJobGetInput,
  output: TranscriptionJobGetOutput,
  func: async ({ awsTranscribe }, data) => {
    return awsTranscribe.call("POST", "/GetTranscriptionJob", data) as any
  },
})
