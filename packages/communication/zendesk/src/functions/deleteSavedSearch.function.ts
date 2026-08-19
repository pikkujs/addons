import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const DeleteSavedSearchInput = z.object({
  id: z.string().describe("The UUID of the saved search. Example: \"d8e18434-97aa-48b3-b406-a325715a50ed\""),
})

export const deleteSavedSearch = pikkuSessionlessFunc({
  description: "Deletes the saved search with the specified id for the requesting agent.\n\n#### Allowed For\n- Agents (own saved searches only)",
  input: DeleteSavedSearchInput,
  errors: [BadRequestError, NotFoundError, ConflictError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/saved_searches/{id}", data)
  },
})
