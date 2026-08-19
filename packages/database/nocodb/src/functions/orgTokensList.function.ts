import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const OrgTokensListInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const OrgTokensListOutput = z.object({
  list: z.array(z.object({
    id: z.string().min(0).max(20).optional().describe("Unique API Token ID"),
    fk_user_id: z.string().min(0).max(20).optional().describe("Foreign Key to User"),
    description: z.string().optional().describe("API Token Description"),
    token: z.string().optional().describe("API Token"),
  })).describe("List of api token objects"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Model for Paginated"),
}).describe("Model for API Token List")

export const orgTokensList = pikkuSessionlessFunc({
  description: "List all organisation API tokens.  Access with API tokens will be blocked.",
  input: OrgTokensListInput,
  output: OrgTokensListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/tokens", data) as any
  },
})
