// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const UpdateDashboardInput = z.any()

export const UpdateDashboardOutput = z.any()

export const updateDashboard = pikkuSessionlessFunc({
  description: "Updates a dashboard, replacing all the dashboard details with those provided.\n\n**[Permissions](#permissions) required:** None\n\nThe dashboard to be updated must be owned by the user.",
  input: UpdateDashboardInput,
  output: UpdateDashboardOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/dashboard/{id}", data) as any
  },
})
