import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserInferenceClassificationCreateOverrideInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  classifyAs: z.enum(["focused", "other"]).optional(),
  senderEmailAddress: z.object({
    address: z.string().nullable().optional().describe("The email address of the person or entity."),
    name: z.string().nullable().optional().describe("The display name of the person or entity."),
  }).optional(),
}),
})

export const UserInferenceClassificationCreateOverrideOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  classifyAs: z.enum(["focused", "other"]).optional(),
  senderEmailAddress: z.object({
    address: z.string().nullable().optional().describe("The email address of the person or entity."),
    name: z.string().nullable().optional().describe("The display name of the person or entity."),
  }).optional(),
})

export const userInferenceClassificationCreateOverride = pikkuSessionlessFunc({
  input: UserInferenceClassificationCreateOverrideInput,
  output: UserInferenceClassificationCreateOverrideOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/inferenceClassification/overrides", data) as any
  },
})
