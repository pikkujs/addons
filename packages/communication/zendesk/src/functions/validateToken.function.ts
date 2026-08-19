import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ValidateTokenOutput = z.string().describe("Empty response")

export const validateToken = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n\n#### Request parameters\n\nThe POST request takes a JSON object parameter which contains the token to be validated.\n\n| Name               | Type      | Required  | Comments\n| ------------------ | ----------| --------- | -------------------\n| instance_push_id   | string    | yes       | The ID of the account to which data will be pushed. This was passed to the integration service when the administrator set up the account\n| request_id         | string    | no        | A unique identifier for the push request\n\n#### Response format\n\nThe response body is empty.",
  output: ValidateTokenOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/any_channel/validate_token") as any
  },
})
