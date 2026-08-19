// jobs — Endpoints related to various background jobs that can be run by the server or separately by job servers.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetJobInput = z.object({
  job_id: z.string().describe("Job GUID"),
})

export const GetJobOutput = z.object({
  id: z.string().optional().describe("The unique id of the job"),
  type: z.string().optional().describe("The type of job"),
  create_at: z.number().int().optional().describe("The time at which the job was created"),
  start_at: z.number().int().optional().describe("The time at which the job was started"),
  last_activity_at: z.number().int().optional().describe("The last time at which the job had activity"),
  status: z.string().optional().describe("The status of the job"),
  progress: z.number().int().optional().describe("The progress (as a percentage) of the job"),
  data: z.record(z.string(), z.unknown()).optional().describe("A freeform data field containing additional information about the job"),
})

export const getJob = pikkuSessionlessFunc({
  description: "Gets a single job.\n__Minimum server version: 4.1__\n##### Permissions\nMust have `manage_jobs` permission.",
  input: GetJobInput,
  output: GetJobOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/jobs/{job_id}", data) as any
  },
})
