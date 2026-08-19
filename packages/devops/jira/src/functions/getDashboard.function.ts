// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetDashboardInput = z.object({
  id: z.string().describe("The ID of the dashboard."),
})

export const GetDashboardOutput = z.any()

export const getDashboard = pikkuSessionlessFunc({
  description: "Returns a dashboard.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.\n\nHowever, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users.",
  input: GetDashboardInput,
  output: GetDashboardOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/dashboard/{id}", data) as any
  },
})
