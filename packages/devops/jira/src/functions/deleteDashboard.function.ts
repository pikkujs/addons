// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const DeleteDashboardInput = z.object({
  id: z.string().describe("The ID of the dashboard."),
})

export const deleteDashboard = pikkuSessionlessFunc({
  description: "Deletes a dashboard.\n\n**[Permissions](#permissions) required:** None\n\nThe dashboard to be deleted must be owned by the user.",
  input: DeleteDashboardInput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/dashboard/{id}", data)
  },
})
