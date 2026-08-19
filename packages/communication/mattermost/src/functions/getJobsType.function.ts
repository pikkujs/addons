// jobs — Endpoints related to various background jobs that can be run by the server or separately by job servers.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetJobsTypeInput = z.object({
  type: z.string().describe("Job type"),
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of jobs per page."),
})

export const GetJobsTypeOutput = z.array(z.object({
  id: z.string().optional().describe("The unique id of the job"),
  type: z.string().optional().describe("The type of job"),
  create_at: z.number().int().optional().describe("The time at which the job was created"),
  start_at: z.number().int().optional().describe("The time at which the job was started"),
  last_activity_at: z.number().int().optional().describe("The last time at which the job had activity"),
  status: z.string().optional().describe("The status of the job"),
  progress: z.number().int().optional().describe("The progress (as a percentage) of the job"),
  data: z.record(z.string(), z.unknown()).optional().describe("A freeform data field containing additional information about the job"),
}))

export const getJobsType = pikkuSessionlessFunc({
  description: "Get a page of jobs of the given type. Use the query parameters to modify the behaviour of this endpoint.\n__Minimum server version: 4.1__\n##### Permissions\nMust have `manage_jobs` permission.",
  input: GetJobsTypeInput,
  output: GetJobsTypeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/jobs/type/{type}", data) as any
  },
})
