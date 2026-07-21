// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const RemoveGadgetInput = z.object({
  dashboardId: z.number().int().describe("The ID of the dashboard."),
  gadgetId: z.number().int().describe("The ID of the gadget."),
})

export const RemoveGadgetOutput = z.unknown()

export const removeGadget = pikkuSessionlessFunc({
  description: "Removes a dashboard gadget from a dashboard.\n\nWhen a gadget is removed from a dashboard, other gadgets in the same column are moved up to fill the emptied position.\n\n**[Permissions](#permissions) required:** None.",
  input: RemoveGadgetInput,
  output: RemoveGadgetOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/dashboard/{dashboardId}/gadget/{gadgetId}", data) as any
  },
})
