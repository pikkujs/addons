// jobs — Endpoints related to various background jobs that can be run by the server or separately by job servers.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateJobsInput = z.object({
  type: z.string().describe("The type of job to create"),
  data: z.record(z.string(), z.unknown()).optional().describe("An object containing any additional data required for this job type"),
})

export const CreateJobsOutput = z.object({
  id: z.string().optional().describe("The unique id of the job"),
  type: z.string().optional().describe("The type of job"),
  create_at: z.number().int().optional().describe("The time at which the job was created"),
  start_at: z.number().int().optional().describe("The time at which the job was started"),
  last_activity_at: z.number().int().optional().describe("The last time at which the job had activity"),
  status: z.string().optional().describe("The status of the job"),
  progress: z.number().int().optional().describe("The progress (as a percentage) of the job"),
  data: z.record(z.string(), z.unknown()).optional().describe("A freeform data field containing additional information about the job"),
})

export const createJobs = pikkuSessionlessFunc({
  description: "Create a new job.\n__Minimum server version: 4.1__\n##### Permissions\nMust have `manage_jobs` permission.",
  input: CreateJobsInput,
  output: CreateJobsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/jobs", data) as any
  },
})
