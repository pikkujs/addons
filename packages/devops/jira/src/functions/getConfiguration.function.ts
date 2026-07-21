// Jira settings — This resource represents various settings in Jira. Use it to get and update Jira settings and properties.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetConfigurationOutput = z.object({
  attachmentsEnabled: z.boolean().optional().describe("Whether the ability to add attachments to issues is enabled."),
  issueLinkingEnabled: z.boolean().optional().describe("Whether the ability to link issues is enabled."),
  subTasksEnabled: z.boolean().optional().describe("Whether the ability to create subtasks for issues is enabled."),
  timeTrackingConfiguration: z.object({
    defaultUnit: z.enum(["minute", "hour", "day", "week"]).describe("The default unit of time applied to logged time."),
    timeFormat: z.enum(["pretty", "days", "hours"]).describe("The format that will appear on an issue's *Time Spent* field."),
    workingDaysPerWeek: z.number().describe("The number of days in a working week."),
    workingHoursPerDay: z.number().describe("The number of hours in a working day."),
  }).optional().describe("The configuration of time tracking."),
  timeTrackingEnabled: z.boolean().optional().describe("Whether the ability to track time is enabled. This property is deprecated."),
  unassignedIssuesAllowed: z.boolean().optional().describe("Whether the ability to create unassigned issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details."),
  votingEnabled: z.boolean().optional().describe("Whether the ability for users to vote on issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details."),
  watchingEnabled: z.boolean().optional().describe("Whether the ability for users to watch issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details."),
}).describe("Details about the configuration of Jira.")

export const getConfiguration = pikkuSessionlessFunc({
  description: "Returns the [global settings](https://confluence.atlassian.com/x/qYXKM) in Jira. These settings determine whether optional features (for example, subtasks, time tracking, and others) are enabled. If time tracking is enabled, this operation also returns the time tracking configuration.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  output: GetConfigurationOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/configuration") as any
  },
})
