import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReportChannelbackErrorOutput = z.string().describe("Empty response")

export const reportChannelbackError = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n\n#### Request parameters\n\nThe POST request takes a JSON object parameter which contains information about the\nproblematic [channelback](/documentation/channel_framework/understanding-the-channel-framework/channelback/).\n\n| Name               | Type      | Required  | Comments\n| ------------------ | ----------| --------- | -------------------\n| instance_push_id   | string    | yes       | The ID of the account to which data will be pushed.  This was passed to the integration service when the administrator set up the account\n| external_id        | string    | yes       | Unique identifier of the external resource from the original channelback (string)\n| description        | string    | no        | A human readable description of the error\n| request_id         | string    | no        | A unique identifier for the request\n\n\n#### Response format\n\nThe response does not include a response body",
  output: ReportChannelbackErrorOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/any_channel/channelback/report_error") as any
  },
})
