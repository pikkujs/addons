// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const CopyDashboardInput = z.any()

export const CopyDashboardOutput = z.any()

export const copyDashboard = pikkuSessionlessFunc({
  description: "Copies a dashboard. Any values provided in the `dashboard` parameter replace those in the copied dashboard.\n\n**[Permissions](#permissions) required:** None\n\nThe dashboard to be copied must be owned by or shared with the user.",
  input: CopyDashboardInput,
  output: CopyDashboardOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/dashboard/{id}/copy", data) as any
  },
})
