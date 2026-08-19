import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsSearchInput = z.object({
  team_ids: z.string().optional().describe("Comma separated string of team IDs, signifying the workspaces to search through."),
  query: z.string().optional().describe("Name of the the channel to query by."),
  limit: z.number().int().optional().describe("Maximum number of items to be returned. Must be between 1 - 20 both inclusive. Default is 10."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."),
  search_channel_types: z.string().optional().describe("The type of channel to include or exclude in the search. For example `private` will search private channels, while `private_exclude` will exclude them. For a full list of types, check the [Types section](#types)."),
  sort: z.string().optional().describe("Possible values are `relevant` (search ranking based on what we think is closest), `name` (alphabetical), `member_count` (number of users in the channel), and `created` (date channel was created). You can optionally pair this with the `sort_dir` arg to change how it is sorted "),
  sort_dir: z.string().optional().describe("Sort direction. Possible values are `asc` for ascending order like (1, 2, 3) or (a, b, c), and `desc` for descending order like (3, 2, 1) or (c, b, a)"),
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:read`"),
})

export const AdminConversationsSearchOutput = z.object({
  channels: z.array(z.object({
    accepted_user: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")).optional(),
    created: z.number().int(),
    creator: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
    id: z.string().regex(new RegExp("^[C][A-Z0-9]{2,}$")),
    is_archived: z.boolean().optional(),
    is_channel: z.boolean(),
    is_frozen: z.boolean().optional(),
    is_general: z.boolean().optional(),
    is_member: z.boolean().optional(),
    is_moved: z.number().int().optional(),
    is_mpim: z.boolean(),
    is_non_threadable: z.boolean().optional(),
    is_org_shared: z.boolean(),
    is_pending_ext_shared: z.boolean().optional(),
    is_private: z.boolean(),
    is_read_only: z.boolean().optional(),
    is_shared: z.boolean(),
    is_thread_only: z.boolean().optional(),
    last_read: z.string().regex(new RegExp("^\\d{10}\\.\\d{6}$")).optional(),
    latest: z.unknown().optional(),
    members: z.array(z.string()).min(0),
    name: z.string(),
    name_normalized: z.string(),
    num_members: z.number().int().optional(),
    pending_shared: z.array(z.string()).min(0).optional(),
    previous_names: z.array(z.string()).min(0).optional(),
    priority: z.number().optional(),
    purpose: z.object({
      creator: z.string().regex(new RegExp("^[UW][A-Z0-9]{8,}$|^$")),
      last_set: z.number().int(),
      value: z.string(),
    }),
    topic: z.object({
      creator: z.string().regex(new RegExp("^[UW][A-Z0-9]{8,}$|^$")),
      last_set: z.number().int(),
      value: z.string(),
    }),
    unlinked: z.number().int().optional(),
    unread_count: z.number().int().optional(),
    unread_count_display: z.number().int().optional(),
  })),
  next_cursor: z.string(),
}).describe("Schema for successful response of admin.conversations.search")

export const adminConversationsSearch = pikkuSessionlessFunc({
  description: "Search for public or private channels in an Enterprise organization.",
  input: AdminConversationsSearchInput,
  output: AdminConversationsSearchOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.conversations.search", data) as any
  },
})
