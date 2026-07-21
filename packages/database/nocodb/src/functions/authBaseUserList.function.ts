import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthBaseUserListInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const AuthBaseUserListOutput = z.object({
  users: z.object({
    list: z.array(z.object({
      id: z.string().describe("Unique identifier for the given user."),
      email: z.string().email(),
      roles: z.string().optional(),
      email_verified: z.boolean().describe("Set to true if the user's email has been verified."),
      created_at: z.string().date().optional().describe("The date that the user was created."),
      updated_at: z.string().date().optional().describe("The date that the user was created."),
      display_name: z.string().optional(),
      user_name: z.string().optional(),
      bio: z.string().optional(),
      location: z.string().optional(),
      website: z.string().optional(),
      avatar: z.string().optional(),
      is_new_user: z.boolean().optional(),
      token_version: z.string().optional().describe("Access token version"),
      meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta data for user"),
    })).min(1),
    pageInfo: z.object({
      isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
      isLastPage: z.boolean().optional().describe("Is the current page the last page"),
      page: z.number().optional().describe("The current page"),
      offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
      pageSize: z.number().optional().describe("The number of pages"),
      totalRows: z.number().optional().describe("The number of rows in the given result"),
    }).describe("Model for Paginated"),
  }).optional(),
})

export const authBaseUserList = pikkuSessionlessFunc({
  description: "List all users in the given base.",
  input: AuthBaseUserListInput,
  output: AuthBaseUserListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/projects/{baseId}/users", data) as any
  },
})
