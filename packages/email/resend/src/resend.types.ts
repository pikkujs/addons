import { z } from 'zod'

// Result returned by the Resend `/emails` endpoint
export const ResendSendResultSchema = z.object({
  id: z.string().describe('The id of the sent email'),
})

export type ResendSendResult = z.infer<typeof ResendSendResultSchema>
