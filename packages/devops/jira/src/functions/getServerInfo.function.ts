// Server info — This resource provides information about the Jira instance.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetServerInfoOutput = z.object({
  baseUrl: z.string().optional().describe("The base URL of the Jira instance."),
  buildDate: z.string().datetime().optional().describe("The timestamp when the Jira version was built."),
  buildNumber: z.number().int().optional().describe("The build number of the Jira version."),
  deploymentType: z.string().optional().describe("The type of server deployment. This is always returned as *Cloud*."),
  healthChecks: z.array(z.object({
    description: z.string().optional().describe("The description of the Jira health check item."),
    name: z.string().optional().describe("The name of the Jira health check item."),
    passed: z.boolean().optional().describe("Whether the Jira health check item passed or failed."),
  })).optional().describe("Jira instance health check results. Deprecated and no longer returned."),
  scmInfo: z.string().optional().describe("The unique identifier of the Jira version."),
  serverTime: z.string().datetime().optional().describe("The time in Jira when this request was responded to."),
  serverTitle: z.string().optional().describe("The name of the Jira instance."),
  version: z.string().optional().describe("The version of Jira."),
  versionNumbers: z.array(z.number().int()).optional().describe("The major, minor, and revision version numbers of the Jira version."),
}).describe("Details about the Jira instance.")

export const getServerInfo = pikkuSessionlessFunc({
  description: "Returns information about the Jira instance.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  output: GetServerInfoOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/serverInfo") as any
  },
})
