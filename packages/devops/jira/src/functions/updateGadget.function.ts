// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const UpdateGadgetInput = z.object({
  dashboardId: z.number().int().describe("The ID of the dashboard."),
  gadgetId: z.number().int().describe("The ID of the gadget."),
  color: z.string().optional().describe("The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`."),
  position: z.object({
  "The column position of the gadget.": z.number().int(),
  "The row position of the gadget.": z.number().int(),
}).optional().describe("The position of the gadget."),
  title: z.string().optional().describe("The title of the gadget."),
})

export const UpdateGadgetOutput = z.unknown()

export const updateGadget = pikkuSessionlessFunc({
  description: "Changes the title, position, and color of the gadget on a dashboard.\n\n**[Permissions](#permissions) required:** None.",
  input: UpdateGadgetInput,
  output: UpdateGadgetOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/dashboard/{dashboardId}/gadget/{gadgetId}", data) as any
  },
})
