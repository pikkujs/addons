// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const CreateDashboardInput = z.any()

export const CreateDashboardOutput = z.any()

export const createDashboard = pikkuSessionlessFunc({
  description: "Creates a dashboard.\n\n**[Permissions](#permissions) required:** None.",
  input: CreateDashboardInput,
  output: CreateDashboardOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/dashboard", data) as any
  },
})
