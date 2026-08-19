import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const GetApiV2PublicOauthClientInput = z.object({
  clientId: z.string().describe("Client Id"),
})

export const GetApiV2PublicOauthClientOutput = z.object({
  client_id: z.string().describe("OAuth client identifier"),
  client_name: z.string().describe("Application name"),
  client_uri: z.string().url().optional().describe("Application homepage URL"),
  logo_uri: z.union([z.string().url(), z.object({
    path: z.string().optional(),
    title: z.string().optional(),
    mimetype: z.string().optional(),
    size: z.number().int().optional(),
  })]).optional().describe("Application logo URL or file metadata"),
  client_description: z.string().optional().describe("Application description"),
  redirect_uris: z.array(z.string().url()).describe("Registered redirect URIs"),
  client_type: z.enum(["public", "confidential"]).describe("OAuth client type"),
})

export const getApiV2PublicOauthClient = pikkuSessionlessFunc({
  description: "Retrieve public information about an OAuth client for authorization display",
  input: GetApiV2PublicOauthClientInput,
  output: GetApiV2PublicOauthClientOutput,
  errors: [BadRequestError, NotFoundError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/public/oauth/client/{clientId}", data) as any
  },
})
