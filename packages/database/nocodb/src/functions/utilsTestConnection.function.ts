import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsTestConnectionInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  client: z.enum(["mysql", "mysql2", "oracledb", "pg", "snowflake", "sqlite3", "databricks"]).optional().describe("DB Type"),
  connection: z.object({
  host: z.string().optional(),
  port: z.string().optional(),
  user: z.string().optional(),
  password: z.string().optional(),
  database: z.union([z.string(), z.unknown()]).optional().describe("Model for StringOrNull"),
}).optional(),
})

export const UtilsTestConnectionOutput = z.object({
  code: z.number().optional(),
  message: z.string().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
})

export const utilsTestConnection = pikkuSessionlessFunc({
  description: "Test the DB Connection",
  input: UtilsTestConnectionInput,
  output: UtilsTestConnectionOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/connection/test", data) as any
  },
})
