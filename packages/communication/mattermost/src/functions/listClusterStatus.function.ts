// cluster — Endpoints for configuring and interacting with high availability clusters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const ListClusterStatusOutput = z.array(z.object({
  id: z.string().optional().describe("The unique ID for the node"),
  version: z.string().optional().describe("The server version the node is on"),
  config_hash: z.string().optional().describe("The hash of the configuartion file the node is using"),
  internode_url: z.string().optional().describe("The URL used to communicate with those node from other nodes"),
  hostname: z.string().optional().describe("The hostname for this node"),
  last_ping: z.number().int().optional().describe("The time of the last ping to this node"),
  is_alive: z.boolean().optional().describe("Whether or not the node is alive and well"),
}))

export const listClusterStatus = pikkuSessionlessFunc({
  description: "Get a set of information for each node in the cluster, useful for checking the status and health of each node.\n##### Permissions\nMust have `manage_system` permission.",
  output: ListClusterStatusOutput,
  errors: [ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/cluster/status") as any
  },
})
