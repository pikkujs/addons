import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteCreateInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
  body: z.string().optional(),
})

export const NoteCreateOutput = z.record(z.string(), z.unknown())

export const noteCreate = pikkuSessionlessFunc({
  description: "Create a note",
  input: NoteCreateInput,
  output: NoteCreateOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("POST", "/{workspaceId}/members/{memberId}/notes", data) as any
  },
})
