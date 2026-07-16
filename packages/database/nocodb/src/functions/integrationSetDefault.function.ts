import { pikkuSessionlessFunc } from '#pikku'

export const integrationSetDefault = pikkuSessionlessFunc({
  description: "Set integration as category default",
  func: async ({ nocodb }) => {
    return nocodb.call("PATCH", "/api/v2/meta/integrations/{integrationId}/default")
  },
})
