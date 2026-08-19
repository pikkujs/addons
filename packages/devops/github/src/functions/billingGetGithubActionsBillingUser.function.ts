// billing — Monitor charges and usage from Actions and Packages.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BillingGetGithubActionsBillingUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
})

export const BillingGetGithubActionsBillingUserOutput = z.object({
  included_minutes: z.number().int().describe("The amount of free GitHub Actions minutes available."),
  minutes_used_breakdown: z.object({
    MACOS: z.number().int().optional().describe("Total minutes used on macOS runner machines."),
    UBUNTU: z.number().int().optional().describe("Total minutes used on Ubuntu runner machines."),
    WINDOWS: z.number().int().optional().describe("Total minutes used on Windows runner machines."),
    macos_12_core: z.number().int().optional().describe("Total minutes used on macOS 12 core runner machines."),
    total: z.number().int().optional().describe("Total minutes used on all runner machines."),
    ubuntu_16_core: z.number().int().optional().describe("Total minutes used on Ubuntu 16 core runner machines."),
    ubuntu_32_core: z.number().int().optional().describe("Total minutes used on Ubuntu 32 core runner machines."),
    ubuntu_4_core: z.number().int().optional().describe("Total minutes used on Ubuntu 4 core runner machines."),
    ubuntu_64_core: z.number().int().optional().describe("Total minutes used on Ubuntu 64 core runner machines."),
    ubuntu_8_core: z.number().int().optional().describe("Total minutes used on Ubuntu 8 core runner machines."),
    windows_16_core: z.number().int().optional().describe("Total minutes used on Windows 16 core runner machines."),
    windows_32_core: z.number().int().optional().describe("Total minutes used on Windows 32 core runner machines."),
    windows_4_core: z.number().int().optional().describe("Total minutes used on Windows 4 core runner machines."),
    windows_64_core: z.number().int().optional().describe("Total minutes used on Windows 64 core runner machines."),
    windows_8_core: z.number().int().optional().describe("Total minutes used on Windows 8 core runner machines."),
  }),
  total_minutes_used: z.number().int().describe("The sum of the free and paid GitHub Actions minutes used."),
  total_paid_minutes_used: z.number().int().describe("The total paid GitHub Actions minutes used."),
})

export const billingGetGithubActionsBillingUser = pikkuSessionlessFunc({
  description: "Gets the summary of the free and paid GitHub Actions minutes used.\n\nPaid minutes only apply to workflows in private repositories that use GitHub-hosted runners. Minutes used is listed for each GitHub-hosted runner operating system. Any job re-runs are also included in the usage. The usage returned includes any minute multipliers for macOS and Windows runners, and is rounded up to the nearest whole minute. For more information, see \"[Managing billing for GitHub Actions](https://docs.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions)\".\n\nAccess tokens must have the `user` scope.",
  input: BillingGetGithubActionsBillingUserInput,
  output: BillingGetGithubActionsBillingUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/settings/billing/actions", data) as any
  },
})
