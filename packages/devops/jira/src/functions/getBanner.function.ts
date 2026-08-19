// Announcement banner — This resource represents an announcement banner. Use it to retrieve and update banner configuration.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetBannerOutput = z.object({
  hashId: z.string().optional().describe("Hash of the banner data. The client detects updates by comparing hash IDs."),
  isDismissible: z.boolean().optional().describe("Flag indicating if the announcement banner can be dismissed by the user."),
  isEnabled: z.boolean().optional().describe("Flag indicating if the announcement banner is enabled or not."),
  message: z.string().optional().describe("The text on the announcement banner."),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).optional().describe("Visibility of the announcement banner."),
}).describe("Announcement banner configuration.")

export const getBanner = pikkuSessionlessFunc({
  description: "Returns the current announcement banner configuration.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetBannerOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/announcementBanner") as any
  },
})
