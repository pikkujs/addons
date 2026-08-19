import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AppsUninstallInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `none`"),
  client_id: z.string().optional().describe("Issued when you created your application."),
  client_secret: z.string().optional().describe("Issued when you created your application."),
})

export const AppsUninstallOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from apps.uninstall method")

export const appsUninstall = pikkuSessionlessFunc({
  description: "Uninstalls your app from a workspace.",
  input: AppsUninstallInput,
  output: AppsUninstallOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/apps.uninstall", data) as any
  },
})
