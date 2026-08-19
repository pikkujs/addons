// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetAllGadgetsInput = z.object({
  dashboardId: z.number().int().describe("The ID of the dashboard."),
  moduleKey: z.array(z.string()).optional().describe("The list of gadgets module keys. To include multiple module keys, separate module keys with ampersand: `moduleKey=key:one&moduleKey=key:two`."),
  uri: z.array(z.string()).optional().describe("The list of gadgets URIs. To include multiple URIs, separate URIs with ampersand: `uri=/rest/example/uri/1&uri=/rest/example/uri/2`."),
  gadgetId: z.array(z.number().int()).optional().describe("The list of gadgets IDs. To include multiple IDs, separate IDs with ampersand: `gadgetId=10000&gadgetId=10001`."),
})

export const GetAllGadgetsOutput = z.object({
  gadgets: z.array(z.object({
    color: z.enum(["blue", "red", "yellow", "green", "cyan", "purple", "gray", "white"]).describe("The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`."),
    id: z.number().int().describe("The ID of the gadget instance."),
    moduleKey: z.string().optional().describe("The module key of the gadget type."),
    position: z.object({
      "The column position of the gadget.": z.number().int(),
      "The row position of the gadget.": z.number().int(),
    }).describe("The position of the gadget."),
    title: z.string().describe("The title of the gadget."),
    uri: z.string().optional().describe("The URI of the gadget type."),
  })).describe("The list of gadgets."),
}).describe("The list of gadgets on the dashboard.")

export const getAllGadgets = pikkuSessionlessFunc({
  description: "Returns a list of dashboard gadgets on a dashboard.\n\nThis operation returns:\n\n *  Gadgets from a list of IDs, when `id` is set.\n *  Gadgets with a module key, when `moduleKey` is set.\n *  Gadgets from a list of URIs, when `uri` is set.\n *  All gadgets, when no other parameters are set.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetAllGadgetsInput,
  output: GetAllGadgetsOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/dashboard/{dashboardId}/gadget", data) as any
  },
})
