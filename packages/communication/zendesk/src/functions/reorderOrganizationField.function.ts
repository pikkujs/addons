import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReorderOrganizationFieldOutput = z.string().describe("Empty response")

export const reorderOrganizationField = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins",
  output: ReorderOrganizationFieldOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("PUT", "/api/v2/organization_fields/reorder") as any
  },
})
