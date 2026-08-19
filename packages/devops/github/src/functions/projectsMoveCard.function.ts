// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const ProjectsMoveCardInput = z.object({
  card_id: z.number().int().describe("The unique identifier of the card."),
  column_id: z.number().int().optional().describe("The unique identifier of the column the card should be moved to"),
  position: z.string().regex(new RegExp("^(?:top|bottom|after:\\d+)$")).describe("The position of the card in a column. Can be one of: `top`, `bottom`, or `after:<card_id>` to place after the specified card."),
})

export const ProjectsMoveCardOutput = z.record(z.string(), z.unknown())

export const projectsMoveCard = pikkuSessionlessFunc({
  input: ProjectsMoveCardInput,
  output: ProjectsMoveCardOutput,
  errors: [UnauthorizedError, ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/projects/columns/cards/{card_id}/moves", data) as any
  },
})
