import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsAppInfoInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const UtilsAppInfoOutput = z.object({
  authType: z.string().optional(),
  baseHasAdmin: z.boolean().optional(),
  firstUser: z.boolean().optional(),
  type: z.string().optional(),
  googleAuthEnabled: z.boolean().optional(),
  githubAuthEnabled: z.boolean().optional(),
  oneClick: z.boolean().optional(),
  connectToExternalDB: z.boolean().optional(),
  version: z.string().optional(),
  defaultLimit: z.number().optional(),
  ncMin: z.boolean().optional(),
  teleEnabled: z.boolean().optional(),
  errorReportingEnabled: z.boolean().optional(),
  auditEnabled: z.boolean().optional(),
  ncSiteUrl: z.string().optional(),
  ee: z.boolean().optional(),
  ncAttachmentFieldSize: z.number().optional(),
  ncMaxAttachmentsAllowed: z.number().optional(),
  isCloud: z.boolean().optional(),
  automationLogLevel: z.enum(["OFF", "ERROR", "ALL"]).optional(),
})

export const utilsAppInfo = pikkuSessionlessFunc({
  description: "Get the application info such as authType, defaultLimit, version and etc.",
  input: UtilsAppInfoInput,
  output: UtilsAppInfoOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/nocodb/info", data) as any
  },
})
