// Time tracking — This resource represents time tracking and time tracking providers. Use it to get and set the time tracking provider, get and set the time tracking options, and disable time tracking.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const SetSharedTimeTrackingConfigurationInput = z.object({
  defaultUnit: z.enum(["minute", "hour", "day", "week"]).describe("The default unit of time applied to logged time."),
  timeFormat: z.enum(["pretty", "days", "hours"]).describe("The format that will appear on an issue's *Time Spent* field."),
  workingDaysPerWeek: z.number().describe("The number of days in a working week."),
  workingHoursPerDay: z.number().describe("The number of hours in a working day."),
})

export const SetSharedTimeTrackingConfigurationOutput = z.object({
  defaultUnit: z.enum(["minute", "hour", "day", "week"]).describe("The default unit of time applied to logged time."),
  timeFormat: z.enum(["pretty", "days", "hours"]).describe("The format that will appear on an issue's *Time Spent* field."),
  workingDaysPerWeek: z.number().describe("The number of days in a working week."),
  workingHoursPerDay: z.number().describe("The number of hours in a working day."),
}).describe("Details of the time tracking configuration.")

export const setSharedTimeTrackingConfiguration = pikkuSessionlessFunc({
  description: "Sets the time tracking settings.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SetSharedTimeTrackingConfigurationInput,
  output: SetSharedTimeTrackingConfigurationOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/configuration/timetracking/options", data) as any
  },
})
