import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowGlobalClientInput = z.object({
  global_client_id: z.number().int().describe("The ID of the Global OAuth client. Example: 223443"),
})

export const ShowGlobalClientOutput = z.object({
  global_client: z.object({
    company: z.string().optional().describe("The company that users are asked to approve access to"),
    description: z.string().optional().describe("A short description of the client"),
    id: z.number().int().optional().describe("Automatically assigned when the client is created"),
    identifier: z.string().optional().describe("The unique identifier for the client"),
    kind: z.string().optional().describe("The kind of client, public or confidential"),
    logo_url: z.string().optional().describe("The API logo url of this record"),
    name: z.string().optional().describe("The name of the client"),
  }).optional(),
})

export const showGlobalClient = pikkuSessionlessFunc({
  description: "Returns the global OAuth client associated with the ID sent on the request.\n\n#### Allowed for\n* Admins\n* Agents with the `manage_api_credentials` permission (when enabled for the account)",
  input: ShowGlobalClientInput,
  output: ShowGlobalClientOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/oauth/global_clients/{global_client_id}", data) as any
  },
})
