// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const ProjectsMoveColumnInput = z.object({
  column_id: z.number().int().describe("The unique identifier of the column."),
  position: z.string().regex(new RegExp("^(?:first|last|after:\\d+)$")).describe("The position of the column in a project. Can be one of: `first`, `last`, or `after:<column_id>` to place after the specified column."),
})

export const ProjectsMoveColumnOutput = z.record(z.string(), z.unknown())

export const projectsMoveColumn = pikkuSessionlessFunc({
  input: ProjectsMoveColumnInput,
  output: ProjectsMoveColumnOutput,
  errors: [UnauthorizedError, ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/projects/columns/{column_id}/moves", data) as any
  },
})
