// interactions — Owner or admin management of users interactions.

import { pikkuSessionlessFunc } from '#pikku'

export const interactionsRemoveRestrictionsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Removes any interaction restrictions from your public repositories.",
  func: async ({ github }) => {
    return github.call("DELETE", "/user/interaction-limits")
  },
})
