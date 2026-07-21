// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetAllAvailableDashboardGadgetsOutput = z.object({
  gadgets: z.array(z.object({
    moduleKey: z.string().optional().describe("The module key of the gadget type."),
    title: z.string().describe("The title of the gadget."),
    uri: z.string().optional().describe("The URI of the gadget type."),
  })).describe("The list of available gadgets."),
}).describe("The list of available gadgets.")

export const getAllAvailableDashboardGadgets = pikkuSessionlessFunc({
  description: "Gets a list of all available gadgets that can be added to all dashboards.\n\n**[Permissions](#permissions) required:** None.",
  output: GetAllAvailableDashboardGadgetsOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/dashboard/gadgets") as any
  },
})
