// jobs — Endpoints related to various background jobs that can be run by the server or separately by job servers.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateJobsCancelInput = z.object({
  job_id: z.string().describe("Job GUID"),
})

export const CreateJobsCancelOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createJobsCancel = pikkuSessionlessFunc({
  description: "Cancel a job.\n__Minimum server version: 4.1__\n##### Permissions\nMust have `manage_jobs` permission.",
  input: CreateJobsCancelInput,
  output: CreateJobsCancelOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/jobs/{job_id}/cancel", data) as any
  },
})
