import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsUrlToConfigInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  url: z.string().optional().describe("JDBC URL"),
})

export const UtilsUrlToConfigOutput = z.object({
  client: z.enum(["mysql", "mysql2", "oracledb", "pg", "snowflake", "sqlite3", "databricks"]).optional().describe("DB Type"),
  connection: z.object({
    user: z.string().optional().describe("DB User"),
    password: z.string().optional().describe("DB Password"),
    database: z.string().optional().describe("DB Name"),
    host: z.string().optional().describe("DB Host"),
    port: z.string().optional().describe("DB Host"),
  }).optional().describe("Connection Config"),
})

export const utilsUrlToConfig = pikkuSessionlessFunc({
  description: "Extract XC URL From JDBC and parse to connection config",
  input: UtilsUrlToConfigInput,
  output: UtilsUrlToConfigOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/url_to_config", data) as any
  },
})
