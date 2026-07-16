// Issue notification schemes — This resource represents notification schemes, lists of events and the recipients who will receive notifications for those events. Use it to get details of a notification scheme and a list of notification schemes. ### About notification schemes ### A notification scheme is a list of events and recipients who will receive notifications for those events. The list is contained within the `notificationSchemeEvents` object and contains pairs of `events` and `notifications`: * `event` Identifies the type of event. The events can be [Jira system events](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or [custom events](https://confluence.atlassian.com/x/AIlKLg). * `notifications` Identifies the [recipients](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-recipientsRecipients) of notifications for each event. Recipients can be any of the following types: * `CurrentAssignee` * `Reporter` * `CurrentUser` * `ProjectLead` * `ComponentLead` * `User` (the `parameter` is the user key) * `Group` (the `parameter` is the group name) * `ProjectRole` (the `parameter` is the project role ID) * `EmailAddress` * `AllWatchers` * `UserCustomField` (the `parameter` is the ID of the custom field) * `GroupCustomField`(the `parameter` is the ID of the custom field)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetNotificationSchemeToProjectMappingsInput = z.object({
  startAt: z.string().optional().default("0").describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.string().optional().default("50").describe("The maximum number of items to return per page."),
  notificationSchemeId: z.array(z.string()).optional().describe("The list of notifications scheme IDs to be filtered out"),
  projectId: z.array(z.string()).optional().describe("The list of project IDs to be filtered out"),
})

export const GetNotificationSchemeToProjectMappingsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    notificationSchemeId: z.string().optional(),
    projectId: z.string().optional(),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getNotificationSchemeToProjectMappings = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) mapping of project that have notification scheme assigned. You can provide either one or multiple notification scheme IDs or project IDs to filter by. If you don't provide any, this will return a list of all mappings. Note that only company-managed (classic) projects are supported. This is because team-managed projects don't have a concept of a default notification scheme. The mappings are ordered by projectId.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetNotificationSchemeToProjectMappingsInput,
  output: GetNotificationSchemeToProjectMappingsOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/notificationscheme/project", data) as any
  },
})
