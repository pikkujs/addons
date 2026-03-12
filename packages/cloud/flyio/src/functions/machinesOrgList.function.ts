import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesOrgListInput = z.object({
  org_slug: z.string().describe("Fly Organization Slug"),
  include_deleted: z.boolean().optional().describe("Include deleted machines"),
  region: z.string().optional().describe("Region filter"),
  state: z.string().optional().describe("Comma separated list of states to filter (created, started, stopped, suspended)"),
  updated_after: z.string().optional().describe("Only return machines updated after this time. Timestamp must be in the RFC 3339 format"),
  cursor: z.string().optional().describe("Pagination cursor from previous response (takes precedence over updated_after)"),
  limit: z.number().int().optional().describe("The number of machines to fetch (max of 2000). This limit is advisory. Responses may be shorter, even when more machines remain. If omitted, the maximum is used"),
})

export const MachinesOrgListOutput = z.object({
  last_machine_id: z.string().optional(),
  last_updated_at: z.string().optional(),
  machines: z.array(z.object({
    app_id: z.number().int().optional(),
    app_name: z.string().optional(),
    created_at: z.string().optional(),
    id: z.string().optional(),
    instance_id: z.string().optional(),
    name: z.string().optional(),
    private_ip: z.string().optional(),
    region: z.string().optional(),
    state: z.string().optional(),
    updated_at: z.string().optional(),
  })).optional(),
  next_cursor: z.string().optional(),
})

export const machinesOrgList = pikkuSessionlessFunc({
  description: "List all Machines associated with a specific organization. Machines are sorted by their `updated_at` timestamps, oldest to newest.\n\nThis API call represents \"a point in time\". Recent machine changes, including creations and destructions, may take time to propagate. When polling with `updated_after`, offset your timestamps to catch late-arriving events.",
  input: MachinesOrgListInput,
  output: MachinesOrgListOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/orgs/{org_slug}/machines', data) as any
  },
})
