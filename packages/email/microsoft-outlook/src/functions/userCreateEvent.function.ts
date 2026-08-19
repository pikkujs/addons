import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCreateEventInput = z.any()

export const UserCreateEventOutput = z.any()

export const userCreateEvent = pikkuSessionlessFunc({
  input: UserCreateEventInput,
  output: UserCreateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/events", data) as any
  },
})
