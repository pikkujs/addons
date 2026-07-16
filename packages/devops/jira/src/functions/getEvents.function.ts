// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetEventsOutput = z.array(z.object({
  id: z.number().int().optional().describe("The ID of the event."),
  name: z.string().optional().describe("The name of the event."),
}))

export const getEvents = pikkuSessionlessFunc({
  description: "Returns all issue events.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetEventsOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/events") as any
  },
})
