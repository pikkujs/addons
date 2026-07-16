import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserInferenceClassificationDeleteOverrideInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "inferenceClassificationOverride-id": z.string().describe("The unique identifier of inferenceClassificationOverride"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userInferenceClassificationDeleteOverride = pikkuSessionlessFunc({
  input: UserInferenceClassificationDeleteOverrideInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/inferenceClassification/overrides/{inferenceClassificationOverride-id}", data)
  },
})
