import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const deleteAuthenticatedSession = pikkuSessionlessFunc({
  description: "Deletes the current session. In practice, this only works when using session auth for requests, such as client-side requests\nmade from a Zendesk app. When using OAuth or basic authentication, you don't have a current session so this endpoint has no effect.\n\n#### Allowed For\n\n* Admins, Agents, End users",
  func: async ({ zendesk }) => {
    return zendesk.call("DELETE", "/api/v2/users/me/logout")
  },
})
