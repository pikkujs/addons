// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposGetPunchCardStatsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetPunchCardStatsOutput = z.array(z.array(z.number().int()))

export const reposGetPunchCardStats = pikkuSessionlessFunc({
  description: "Each array contains the day number, hour number, and number of commits:\n\n*   `0-6`: Sunday - Saturday\n*   `0-23`: Hour of day\n*   Number of commits\n\nFor example, `[2, 14, 25]` indicates that there were 25 total commits, during the 2:00pm hour on Tuesdays. All times are based on the time zone of individual commits.",
  input: ReposGetPunchCardStatsInput,
  output: ReposGetPunchCardStatsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/stats/punch_card", data) as any
  },
})
