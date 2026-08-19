import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteGetAllInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
  page: z.number().optional(),
})

export const NoteGetAllOutput = z.record(z.string(), z.unknown())

export const noteGetAll = pikkuSessionlessFunc({
  description: "Get many notes for a member",
  input: NoteGetAllInput,
  output: NoteGetAllOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("GET", "/{workspaceId}/members/{memberId}/notes", data) as any
  },
})
