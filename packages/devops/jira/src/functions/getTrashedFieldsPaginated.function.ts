// Issue fields — This resource represents issue fields, both system and custom fields. Use it to get fields, field configurations, and create custom fields.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetTrashedFieldsPaginatedInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  id: z.array(z.string()).optional(),
  query: z.string().optional().describe("String used to perform a case-insensitive partial match with field names or descriptions."),
  expand: z.enum(["name", "-name", "+name", "trashDate", "-trashDate", "+trashDate", "plannedDeletionDate", "-plannedDeletionDate", "+plannedDeletionDate", "projectsCount", "-projectsCount", "+projectsCount"]).optional(),
  orderBy: z.string().optional().describe("[Order](#ordering) the results by a field:\n\n *  `name` sorts by the field name\n *  `trashDate` sorts by the date the field was moved to the trash\n *  `plannedDeletionDate` sorts by the planned deletion date"),
})

export const GetTrashedFieldsPaginatedOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    contextsCount: z.number().int().optional().describe("Number of contexts where the field is used."),
    description: z.string().optional().describe("The description of the field."),
    id: z.string().describe("The ID of the field."),
    isLocked: z.boolean().optional().describe("Whether the field is locked."),
    isUnscreenable: z.boolean().optional().describe("Whether the field is shown on screen or not."),
    key: z.string().optional().describe("The key of the field."),
    lastUsed: z.object({
      type: z.enum(["TRACKED", "NOT_TRACKED", "NO_INFORMATION"]).optional().describe("Last used value type:\n\n *  *TRACKED*: field is tracked and a last used date is available.\n *  *NOT\\_TRACKED*: field is not tracked, last used date is not available.\n *  *NO\\_INFORMATION*: field is tracked, but no last used date is available."),
      value: z.string().datetime().optional().describe("The date when the value of the field last changed."),
    }).optional().describe("Information about the most recent use of a field."),
    name: z.string().describe("The name of the field."),
    projectsCount: z.number().int().optional().describe("Number of projects where the field is used."),
    schema: z.object({
      configuration: z.record(z.string(), z.unknown()).optional().describe("If the field is a custom field, the configuration of the field."),
      custom: z.string().optional().describe("If the field is a custom field, the URI of the field."),
      customId: z.number().int().optional().describe("If the field is a custom field, the custom ID of the field."),
      items: z.string().optional().describe("When the data type is an array, the name of the field items within the array."),
      system: z.string().optional().describe("If the field is a system field, the name of the field."),
      type: z.string().describe("The data type of the field."),
    }).describe("The schema of a field."),
    screensCount: z.number().int().optional().describe("Number of screens where the field is used."),
    searcherKey: z.string().optional().describe("The searcher key of the field. Returned for custom fields."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getTrashedFieldsPaginated = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of fields in the trash. The list may be restricted to fields whose field name or description partially match a string.\n\nOnly custom fields can be queried, `type` must be set to `custom`.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetTrashedFieldsPaginatedInput,
  output: GetTrashedFieldsPaginatedOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/field/search/trashed", data) as any
  },
})
