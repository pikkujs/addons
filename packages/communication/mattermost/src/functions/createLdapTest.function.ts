// LDAP — Endpoints for configuring and interacting with LDAP.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InternalServerError } from '@pikku/core/errors'

export const CreateLdapTestOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createLdapTest = pikkuSessionlessFunc({
  description: "Test the current AD/LDAP configuration to see if the AD/LDAP server can be contacted successfully.\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateLdapTestOutput,
  errors: [InternalServerError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/ldap/test") as any
  },
})
