import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteUsersApplicationPasswordInput = z.object({
  user_id: z.string(),
  uuid: z.string(),
})

export const DeleteUsersApplicationPasswordOutput = z.object({
  uuid: z.string().uuid().optional().describe("The unique identifier for the application password."),
  app_id: z.string().optional().describe("A UUID provided by the application to uniquely identify it. It is recommended to use an UUID v5 with the URL or DNS namespace."),
  name: z.string().min(1).regex(new RegExp(".*\\S.*")).optional().describe("The name of the application password."),
  password: z.string().optional().describe("The generated password. Only available after adding an application."),
  created: z.string().datetime().optional().describe("The GMT date the application password was created."),
  last_used: z.string().datetime().nullable().optional().describe("The GMT date the application password was last used."),
  last_ip: z.string().nullable().optional().describe("The IP address the application password was last used by."),
})

export const deleteUsersApplicationPassword = pikkuSessionlessFunc({
  input: DeleteUsersApplicationPasswordInput,
  output: DeleteUsersApplicationPasswordOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("DELETE", "/users/{user_id}/application-passwords/{uuid}", data) as any
  },
})
