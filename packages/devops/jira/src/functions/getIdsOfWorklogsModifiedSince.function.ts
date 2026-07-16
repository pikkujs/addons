// Issue worklogs — This resource represents issue worklogs. Use it to: * get, create, update, and delete worklogs. * obtain lists of updated or deleted worklogs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetIdsOfWorklogsModifiedSinceInput = z.object({
  since: z.number().int().optional().default(0).describe("The date and time, as a UNIX timestamp in milliseconds, after which updated worklogs are returned."),
  expand: z.string().optional().default("").describe("Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog."),
})

export const GetIdsOfWorklogsModifiedSinceOutput = z.object({
  lastPage: z.boolean().optional(),
  nextPage: z.string().url().optional().describe("The URL of the next list of changed worklogs."),
  self: z.string().url().optional().describe("The URL of this changed worklogs list."),
  since: z.number().int().optional().describe("The datetime of the first worklog item in the list."),
  until: z.number().int().optional().describe("The datetime of the last worklog item in the list."),
  values: z.array(z.object({
    properties: z.array(z.object({
      key: z.string().optional().describe("The key of the property. Required on create and update."),
      value: z.unknown().optional().describe("The value of the property. Required on create and update."),
    })).optional().describe("Details of properties associated with the change."),
    updatedTime: z.number().int().optional().describe("The datetime of the change."),
    worklogId: z.number().int().optional().describe("The ID of the worklog."),
  })).optional().describe("Changed worklog list."),
}).describe("List of changed worklogs.")

export const getIdsOfWorklogsModifiedSince = pikkuSessionlessFunc({
  description: "Returns a list of IDs and update timestamps for worklogs updated after a date and time.\n\nThis resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the last page of worklogs.\n\nThis resource does not return worklogs updated during the minute preceding the request.\n\n**[Permissions](#permissions) required:** Permission to access Jira, however, worklogs are only returned where either of the following is true:\n\n *  the worklog is set as *Viewable by All Users*.\n *  the user is a member of a project role or group with permission to view the worklog.",
  input: GetIdsOfWorklogsModifiedSinceInput,
  output: GetIdsOfWorklogsModifiedSinceOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/worklog/updated", data) as any
  },
})
