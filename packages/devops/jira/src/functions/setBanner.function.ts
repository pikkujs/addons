// Announcement banner — This resource represents an announcement banner. Use it to retrieve and update banner configuration.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const SetBannerInput = z.object({
  isDismissible: z.boolean().optional().describe("Flag indicating if the announcement banner can be dismissed by the user."),
  isEnabled: z.boolean().optional().describe("Flag indicating if the announcement banner is enabled or not."),
  message: z.string().optional().describe("The text on the announcement banner."),
  visibility: z.string().optional().describe("Visibility of the announcement banner. Can be public or private."),
})

export const SetBannerOutput = z.unknown()

export const setBanner = pikkuSessionlessFunc({
  description: "Updates the announcement banner configuration.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SetBannerInput,
  output: SetBannerOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/announcementBanner", data) as any
  },
})
