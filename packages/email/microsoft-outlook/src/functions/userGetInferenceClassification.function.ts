import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetInferenceClassificationInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserGetInferenceClassificationOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  overrides: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    classifyAs: z.enum(["focused", "other"]).optional(),
    senderEmailAddress: z.object({
      address: z.string().nullable().optional().describe("The email address of the person or entity."),
      name: z.string().nullable().optional().describe("The display name of the person or entity."),
    }).optional(),
  })).optional().describe("A set of overrides for a user to always classify messages from specific senders in certain ways: focused, or other. Read-only. Nullable."),
})

export const userGetInferenceClassification = pikkuSessionlessFunc({
  description: "Relevance classification of the user's messages based on explicit designations that override inferred relevance or importance.",
  input: UserGetInferenceClassificationInput,
  output: UserGetInferenceClassificationOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/inferenceClassification", data) as any
  },
})
