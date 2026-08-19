// LDAP — Endpoints for configuring and interacting with LDAP.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateLdapSyncOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createLdapSync = pikkuSessionlessFunc({
  description: "Synchronize any user attribute changes in the configured AD/LDAP server with Mattermost.\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateLdapSyncOutput,
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/ldap/sync") as any
  },
})
