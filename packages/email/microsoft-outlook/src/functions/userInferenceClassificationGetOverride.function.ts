import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserInferenceClassificationGetOverrideInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "inferenceClassificationOverride-id": z.string().describe("The unique identifier of inferenceClassificationOverride"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserInferenceClassificationGetOverrideOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  classifyAs: z.enum(["focused", "other"]).optional(),
  senderEmailAddress: z.object({
    address: z.string().nullable().optional().describe("The email address of the person or entity."),
    name: z.string().nullable().optional().describe("The display name of the person or entity."),
  }).optional(),
})

export const userInferenceClassificationGetOverride = pikkuSessionlessFunc({
  description: "A set of overrides for a user to always classify messages from specific senders in certain ways: focused, or other. Read-only. Nullable.",
  input: UserInferenceClassificationGetOverrideInput,
  output: UserInferenceClassificationGetOverrideOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/inferenceClassification/overrides/{inferenceClassificationOverride-id}", data) as any
  },
})
