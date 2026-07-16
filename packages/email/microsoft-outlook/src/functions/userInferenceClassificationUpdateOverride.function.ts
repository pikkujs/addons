import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserInferenceClassificationUpdateOverrideInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "inferenceClassificationOverride-id": z.string().describe("The unique identifier of inferenceClassificationOverride"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  classifyAs: z.enum(["focused", "other"]).optional(),
  senderEmailAddress: z.object({
    address: z.string().nullable().optional().describe("The email address of the person or entity."),
    name: z.string().nullable().optional().describe("The display name of the person or entity."),
  }).optional(),
}),
})

export const UserInferenceClassificationUpdateOverrideOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  classifyAs: z.enum(["focused", "other"]).optional(),
  senderEmailAddress: z.object({
    address: z.string().nullable().optional().describe("The email address of the person or entity."),
    name: z.string().nullable().optional().describe("The display name of the person or entity."),
  }).optional(),
})

export const userInferenceClassificationUpdateOverride = pikkuSessionlessFunc({
  input: UserInferenceClassificationUpdateOverrideInput,
  output: UserInferenceClassificationUpdateOverrideOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/inferenceClassification/overrides/{inferenceClassificationOverride-id}", data) as any
  },
})
