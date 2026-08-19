// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AddGadgetInput = z.object({
  dashboardId: z.number().int().describe("The ID of the dashboard."),
  color: z.string().optional().describe("The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`."),
  ignoreUriAndModuleKeyValidation: z.boolean().optional().describe("Whether to ignore the validation of module key and URI. For example, when a gadget is created that is a part of an application that isn't installed."),
  moduleKey: z.string().optional().describe("The module key of the gadget type. Can't be provided with `uri`."),
  position: z.object({
  "The column position of the gadget.": z.number().int(),
  "The row position of the gadget.": z.number().int(),
}).optional().describe("The position of the gadget. When the gadget is placed into the position, other gadgets in the same column are moved down to accommodate it."),
  title: z.string().optional().describe("The title of the gadget."),
  uri: z.string().optional().describe("The URI of the gadget type. Can't be provided with `moduleKey`."),
})

export const AddGadgetOutput = z.object({
  color: z.enum(["blue", "red", "yellow", "green", "cyan", "purple", "gray", "white"]).describe("The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`."),
  id: z.number().int().describe("The ID of the gadget instance."),
  moduleKey: z.string().optional().describe("The module key of the gadget type."),
  position: z.object({
    "The column position of the gadget.": z.number().int(),
    "The row position of the gadget.": z.number().int(),
  }).describe("The position of the gadget."),
  title: z.string().describe("The title of the gadget."),
  uri: z.string().optional().describe("The URI of the gadget type."),
}).describe("Details of a gadget.")

export const addGadget = pikkuSessionlessFunc({
  description: "Adds a gadget to a dashboard.\n\n**[Permissions](#permissions) required:** None.",
  input: AddGadgetInput,
  output: AddGadgetOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/dashboard/{dashboardId}/gadget", data) as any
  },
})
