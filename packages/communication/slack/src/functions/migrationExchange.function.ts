import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MigrationExchangeInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `tokens.basic`"),
  users: z.string().describe("A comma-separated list of user ids, up to 400 per request"),
  team_id: z.string().optional().describe("Specify team_id starts with `T` in case of Org Token"),
  to_old: z.boolean().optional().describe("Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`."),
})

export const MigrationExchangeOutput = z.object({
  enterprise_id: z.string(),
  invalid_user_ids: z.array(z.string()).optional(),
  ok: z.literal(true),
  team_id: z.string().regex(new RegExp("^[T][A-Z0-9]{2,}$")),
  user_id_map: z.record(z.string(), z.unknown()).optional(),
}).describe("Schema for successful response from migration.exchange method")

export const migrationExchange = pikkuSessionlessFunc({
  description: "For Enterprise Grid workspaces, map local user IDs to global user IDs",
  input: MigrationExchangeInput,
  output: MigrationExchangeOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/migration.exchange", data) as any
  },
})
