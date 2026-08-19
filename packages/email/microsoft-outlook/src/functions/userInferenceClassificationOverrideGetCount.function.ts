import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserInferenceClassificationOverrideGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userInferenceClassificationOverrideGetCount = pikkuSessionlessFunc({
  input: UserInferenceClassificationOverrideGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/inferenceClassification/overrides/$count", data)
  },
})
