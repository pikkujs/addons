// Screen schemes — This resource represents screen schemes in classic projects. Use it to get, create, update, and delete screen schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateScreenSchemeInput = z.object({
  description: z.string().optional().describe("The description of the screen scheme. The maximum length is 255 characters."),
  name: z.string().describe("The name of the screen scheme. The name must be unique. The maximum length is 255 characters."),
  screens: z.object({
  create: z.number().int().optional().describe("The ID of the create screen."),
  default: z.number().int().optional().describe("The ID of the default screen. Required when creating a screen scheme."),
  edit: z.number().int().optional().describe("The ID of the edit screen."),
  view: z.number().int().optional().describe("The ID of the view screen."),
}).describe("The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted."),
})

export const CreateScreenSchemeOutput = z.object({
  id: z.number().int().describe("The ID of the screen scheme."),
}).describe("The ID of a screen scheme.")

export const createScreenScheme = pikkuSessionlessFunc({
  description: "Creates a screen scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateScreenSchemeInput,
  output: CreateScreenSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/screenscheme", data) as any
  },
})
