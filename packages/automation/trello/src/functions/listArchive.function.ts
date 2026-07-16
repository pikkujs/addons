import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListArchiveInput = z.object({
  id: z.string(),
  value: z.boolean().optional(),
})

export const ListArchiveOutput = z.record(z.string(), z.unknown())

export const listArchive = pikkuSessionlessFunc({
  description: "Archive or unarchive a list",
  input: ListArchiveInput,
  output: ListArchiveOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/lists/{id}/closed", data) as any
  },
})
