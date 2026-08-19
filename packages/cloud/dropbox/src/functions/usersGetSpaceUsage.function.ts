import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UsersGetSpaceUsageInput = z.object({
  body: z.unknown(),
})

export const UsersGetSpaceUsageOutput = z.object({
  allocation: z.object({
    ".tag": z.enum(["individual", "team", "other"]).optional(),
    individual: z.object({
      allocated: z.number().optional().describe("The total space allocated to the user's account (bytes)."),
    }).optional().describe("allocated: The total space allocated to the user's account (bytes).\n"),
    team: z.object({
      allocated: z.number().optional().describe("The total space allocated to the user's team (bytes)."),
      used: z.number().optional().describe("The total space currently used by the user's team (bytes)."),
      user_within_team_space_limit_type: z.object({
        ".tag": z.enum(["off", "alert_only", "stop_sync", "other"]).optional(),
      }).optional().describe("The type of the space limit imposed on a team member.\noff: The team member does not have imposed space limit.\nalert_only: The team member has soft imposed space limit - the limit is used for display and for notifications.\nstop_sync: The team member has hard imposed space limit - Dropbox file sync will stop after the limit is reached.\nother: None\n"),
      user_within_team_space_allocated: z.number().optional().describe("The total space allocated to the user within its team allocated space (0 means that no restriction is imposed on the user's quota within its team)."),
    }).optional().describe("used: The total space currently used by the user's team (bytes).\nallocated: The total space allocated to the user's team (bytes).\nuser_within_team_space_allocated: The total space allocated to the user within its team allocated space (0 means that no restriction is imposed on the user's quota within its team).\nuser_within_team_space_limit_type: The type of the space limit imposed on the team member (off, alert_only, stop_sync).\n"),
  }).optional().describe("Space is allocated differently based on the type of account.\nindividual: The user's space allocation applies only to their individual account.\nteam: The user shares space with other members of their team.\nother: None\n"),
  used: z.number().optional().describe("The user's total space usage (bytes)."),
}).describe("Information about a user's space usage and quota.\nused: The user's total space usage (bytes).\nallocation: The user's space allocation.\n")

export const usersGetSpaceUsage = pikkuSessionlessFunc({
  description: "Get the space usage information for the current user's account.",
  input: UsersGetSpaceUsageInput,
  output: UsersGetSpaceUsageOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/users/get_space_usage", data) as any
  },
})
