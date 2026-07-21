import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupEventDeleteExtensionInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  "extension-id": z.string().describe("The unique identifier of extension"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const groupEventDeleteExtension = pikkuSessionlessFunc({
  input: GroupEventDeleteExtensionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/groups/{group-id}/events/{event-id}/extensions/{extension-id}", data)
  },
})
