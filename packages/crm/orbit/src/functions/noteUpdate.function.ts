import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteUpdateInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
  noteId: z.string(),
  body: z.string().optional(),
})

export const NoteUpdateOutput = z.record(z.string(), z.unknown())

export const noteUpdate = pikkuSessionlessFunc({
  description: "Update a note",
  input: NoteUpdateInput,
  output: NoteUpdateOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("PUT", "/{workspaceId}/members/{memberId}/notes/{noteId}", data) as any
  },
})
