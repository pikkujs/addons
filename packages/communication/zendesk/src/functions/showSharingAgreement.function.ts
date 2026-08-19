import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowSharingAgreementInput = z.object({
  sharing_agreement_id: z.number().int().describe("The ID of the sharing agreement. Example: 1"),
})

export const ShowSharingAgreementOutput = z.object({
  sharing_agreement: z.object({
    created_at: z.string().datetime().optional().describe("The time the record was created"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    name: z.string().optional().describe("Name of this sharing agreement"),
    partner_name: z.string().nullable().optional().describe("Can be one of the following: \"jira\", null"),
    remote_subdomain: z.string().optional().describe("Subdomain of the remote account or null if not associated with an account"),
    status: z.string().optional().describe("Can be one of the following: \"accepted\", \"declined\", \"pending\", \"inactive\", \"failed\", \"ssl_error\", \"configuration_error\""),
    type: z.string().optional().describe("Can be one of the following: \"inbound\", \"outbound\""),
    updated_at: z.string().datetime().optional().describe("The time the record was updated"),
    url: z.string().optional().describe("URL of the sharing agreement record"),
  }).optional(),
})

export const showSharingAgreement = pikkuSessionlessFunc({
  description: "Returns a sharing agreement for your account.\n\n#### Allowed For\n\n* Agents",
  input: ShowSharingAgreementInput,
  output: ShowSharingAgreementOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/sharing_agreements/{sharing_agreement_id}", data) as any
  },
})
