// Screen schemes — This resource represents screen schemes in classic projects. Use it to get, create, update, and delete screen schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateScreenSchemeInput = z.object({
  screenSchemeId: z.string().describe("The ID of the screen scheme."),
  description: z.string().optional().describe("The description of the screen scheme. The maximum length is 255 characters."),
  name: z.string().optional().describe("The name of the screen scheme. The name must be unique. The maximum length is 255 characters."),
  screens: z.object({
  create: z.string().optional().describe("The ID of the create screen. To remove the screen association, pass a null."),
  default: z.string().optional().describe("The ID of the default screen. When specified, must include a screen ID as a default screen is required."),
  edit: z.string().optional().describe("The ID of the edit screen. To remove the screen association, pass a null."),
  view: z.string().optional().describe("The ID of the view screen. To remove the screen association, pass a null."),
}).optional().describe("The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted."),
})

export const UpdateScreenSchemeOutput = z.unknown()

export const updateScreenScheme = pikkuSessionlessFunc({
  description: "Updates a screen scheme. Only screen schemes used in classic projects can be updated.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateScreenSchemeInput,
  output: UpdateScreenSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/screenscheme/{screenSchemeId}", data) as any
  },
})
