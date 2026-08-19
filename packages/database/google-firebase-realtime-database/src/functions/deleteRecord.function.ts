import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteRecordInput = z.object({
  body: z.string().optional(),
})

export const DeleteRecordOutput = z.record(z.string(), z.unknown())

export const deleteRecord = pikkuSessionlessFunc({
  description: "Delete record",
  input: DeleteRecordInput,
  output: DeleteRecordOutput,
  func: async ({ googleFirebaseRealtimeDatabase }, data) => {
    return googleFirebaseRealtimeDatabase.call("POST", "/delete", data) as any
  },
})
