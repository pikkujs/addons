import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMessageListExtensionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserMessageListExtensionOutput = z.object({
  value: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const userMessageListExtension = pikkuSessionlessFunc({
  description: "The collection of open extensions defined for the message. Nullable.",
  input: UserMessageListExtensionInput,
  output: UserMessageListExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/messages/{message-id}/extensions", data) as any
  },
})
