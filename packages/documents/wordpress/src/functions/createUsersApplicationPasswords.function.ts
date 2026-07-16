import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateUsersApplicationPasswordsInput = z.object({
  user_id: z.string(),
  app_id: z.string().optional().describe("A UUID provided by the application to uniquely identify it. It is recommended to use an UUID v5 with the URL or DNS namespace."),
  name: z.string().min(1).regex(new RegExp(".*\\S.*")).describe("The name of the application password."),
})

export const CreateUsersApplicationPasswordsOutput = z.object({
  uuid: z.string().uuid().optional().describe("The unique identifier for the application password."),
  app_id: z.string().optional().describe("A UUID provided by the application to uniquely identify it. It is recommended to use an UUID v5 with the URL or DNS namespace."),
  name: z.string().min(1).regex(new RegExp(".*\\S.*")).optional().describe("The name of the application password."),
  password: z.string().optional().describe("The generated password. Only available after adding an application."),
  created: z.string().datetime().optional().describe("The GMT date the application password was created."),
  last_used: z.string().datetime().nullable().optional().describe("The GMT date the application password was last used."),
  last_ip: z.string().nullable().optional().describe("The IP address the application password was last used by."),
})

export const createUsersApplicationPasswords = pikkuSessionlessFunc({
  input: CreateUsersApplicationPasswordsInput,
  output: CreateUsersApplicationPasswordsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/users/{user_id}/application-passwords", data) as any
  },
})
