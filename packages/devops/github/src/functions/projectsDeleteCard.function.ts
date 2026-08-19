// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ProjectsDeleteCardInput = z.object({
  card_id: z.number().int().describe("The unique identifier of the card."),
})

export const projectsDeleteCard = pikkuSessionlessFunc({
  input: ProjectsDeleteCardInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/projects/columns/cards/{card_id}", data)
  },
})
