import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamInfoInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `team:read`"),
  team: z.string().optional().describe("Team to get info on, if omitted, will return information about the current team. Will only return team that the authenticated token is allowed to see through external shared channels"),
})

export const TeamInfoOutput = z.object({
  ok: z.literal(true),
  team: z.object({
    archived: z.boolean().optional(),
    avatar_base_url: z.string().url().optional(),
    created: z.number().int().optional(),
    date_create: z.number().int().optional(),
    deleted: z.boolean().optional(),
    description: z.string().nullable().optional(),
    discoverable: z.unknown().optional(),
    domain: z.string(),
    email_domain: z.string(),
    enterprise_id: z.string().regex(new RegExp("^[E][A-Z0-9]{8,}$")).optional(),
    enterprise_name: z.string().optional(),
    external_org_migrations: z.object({
      current: z.array(z.object({
        date_started: z.number().int(),
        team_id: z.string(),
      })),
      date_updated: z.number().int(),
    }).optional(),
    has_compliance_export: z.boolean().optional(),
    icon: z.object({
      image_102: z.string().optional(),
      image_132: z.string().optional(),
      image_230: z.string().optional(),
      image_34: z.string().optional(),
      image_44: z.string().optional(),
      image_68: z.string().optional(),
      image_88: z.string().optional(),
      image_default: z.boolean().optional(),
    }),
    id: z.string().regex(new RegExp("^[TE][A-Z0-9]{8,}$")),
    is_assigned: z.boolean().optional(),
    is_enterprise: z.number().int().optional(),
    is_over_storage_limit: z.boolean().optional(),
    limit_ts: z.number().int().optional(),
    locale: z.string().optional(),
    messages_count: z.number().int().optional(),
    msg_edit_window_mins: z.number().int().optional(),
    name: z.string(),
    over_integrations_limit: z.boolean().optional(),
    over_storage_limit: z.boolean().optional(),
    pay_prod_cur: z.string().optional(),
    plan: z.enum(["", "std", "plus", "compliance", "enterprise"]).optional(),
    primary_owner: z.object({
      email: z.string(),
      id: z.string(),
    }).optional(),
    sso_provider: z.object({
      label: z.string().optional(),
      name: z.string().optional(),
      type: z.string().optional(),
    }).optional(),
  }),
}).describe("Schema for successful response from team.info method")

export const teamInfo = pikkuSessionlessFunc({
  description: "Gets information about the current team.",
  input: TeamInfoInput,
  output: TeamInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/team.info", data) as any
  },
})
