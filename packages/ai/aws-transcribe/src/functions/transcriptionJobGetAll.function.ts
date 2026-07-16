import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranscriptionJobGetAllInput = z.object({
  Status: z.string().optional(),
  JobNameContains: z.string().optional(),
  MaxResults: z.number().optional(),
})

export const TranscriptionJobGetAllOutput = z.object({
  TranscriptionJobSummaries: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const transcriptionJobGetAll = pikkuSessionlessFunc({
  description: "Get many transcription jobs",
  input: TranscriptionJobGetAllInput,
  output: TranscriptionJobGetAllOutput,
  func: async ({ awsTranscribe }, data) => {
    return awsTranscribe.call("POST", "/ListTranscriptionJobs", data) as any
  },
})
