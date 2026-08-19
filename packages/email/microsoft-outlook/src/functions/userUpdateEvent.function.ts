import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUpdateEventInput = z.any()

export const UserUpdateEventOutput = z.any()

export const userUpdateEvent = pikkuSessionlessFunc({
  input: UserUpdateEventInput,
  output: UserUpdateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/events/{event-id}", data) as any
  },
})
