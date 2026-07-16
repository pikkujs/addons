// schemes — Endpoints for creating, getting and updating and deleting schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeleteSchemeInput = z.object({
  scheme_id: z.string().describe("ID of the scheme to delete"),
})

export const DeleteSchemeOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteScheme = pikkuSessionlessFunc({
  description: "Soft deletes a scheme, by marking the scheme as deleted in the database.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 5.0",
  input: DeleteSchemeInput,
  output: DeleteSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/schemes/{scheme_id}", data) as any
  },
})
