import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserInferenceClassificationListOverrideInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserInferenceClassificationListOverrideOutput = z.object({
  value: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    classifyAs: z.enum(["focused", "other"]).optional(),
    senderEmailAddress: z.object({
      address: z.string().nullable().optional().describe("The email address of the person or entity."),
      name: z.string().nullable().optional().describe("The display name of the person or entity."),
    }).optional(),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const userInferenceClassificationListOverride = pikkuSessionlessFunc({
  description: "A set of overrides for a user to always classify messages from specific senders in certain ways: focused, or other. Read-only. Nullable.",
  input: UserInferenceClassificationListOverrideInput,
  output: UserInferenceClassificationListOverrideOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/inferenceClassification/overrides", data) as any
  },
})
