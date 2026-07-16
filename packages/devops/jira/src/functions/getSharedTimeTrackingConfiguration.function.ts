// Time tracking — This resource represents time tracking and time tracking providers. Use it to get and set the time tracking provider, get and set the time tracking options, and disable time tracking.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetSharedTimeTrackingConfigurationOutput = z.object({
  defaultUnit: z.enum(["minute", "hour", "day", "week"]).describe("The default unit of time applied to logged time."),
  timeFormat: z.enum(["pretty", "days", "hours"]).describe("The format that will appear on an issue's *Time Spent* field."),
  workingDaysPerWeek: z.number().describe("The number of days in a working week."),
  workingHoursPerDay: z.number().describe("The number of hours in a working day."),
}).describe("Details of the time tracking configuration.")

export const getSharedTimeTrackingConfiguration = pikkuSessionlessFunc({
  description: "Returns the time tracking settings. This includes settings such as the time format, default time unit, and others. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetSharedTimeTrackingConfigurationOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/configuration/timetracking/options") as any
  },
})
