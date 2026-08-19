// Myself — This resource represents information about the current user, such as basic details, group membership, application roles, preferences, and locale. Use it to get, create, update, and delete (restore default) values of the user's preferences and locale.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetLocaleOutput = z.object({
  locale: z.string().optional().describe("The locale code. The Java the locale format is used: a two character language code (ISO 639), an underscore, and two letter country code (ISO 3166). For example, en\\_US represents a locale of English (United States). Required on create."),
}).describe("Details of a locale.")

export const getLocale = pikkuSessionlessFunc({
  description: "Returns the locale for the user.\n\nIf the user has no language preference set (which is the default setting) or this resource is accessed anonymous, the browser locale detected by Jira is returned. Jira detects the browser locale using the *Accept-Language* header in the request. However, if this doesn't match a locale available Jira, the site default locale is returned.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  output: GetLocaleOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/mypreferences/locale") as any
  },
})
