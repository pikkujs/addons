import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateSupportAddressOutput = z.object({
  recipient_address: z.object({
    brand_id: z.number().int().optional().describe("The ID of the [brand](/api-reference/ticketing/account-configuration/brands/)"),
    cname_status: z.enum(["unknown", "verified", "failed"]).optional().describe("Whether all of the required CNAME records are set. Possible values: \"unknown\", \"verified\", \"failed\""),
    created_at: z.string().datetime().optional().describe("When the address was created"),
    default: z.boolean().optional().describe("Whether the address is the account's default support address"),
    dns_results: z.enum(["verified", "failed"]).optional().describe("Verification statuses for the domain and CNAME records. Possible types: \"verified\", \"failed\""),
    domain_verification_code: z.string().optional().describe("Verification string to be added as a TXT record to the domain. Possible types: string or null."),
    domain_verification_status: z.enum(["unknown", "verified", "failed"]).optional().describe("Whether the domain verification record is valid. Possible values: \"unknown\", \"verified\", \"failed\""),
    email: z.string().describe("The email address. You can't change the email address of an existing support address."),
    forwarding_status: z.enum(["unknown", "waiting", "verified", "failed"]).optional().describe("Status of email forwarding. Possible values: \"unknown\", \"waiting\", \"verified\", or \"failed\""),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    name: z.string().optional().describe("The name for the address"),
    spf_status: z.enum(["unknown", "verified", "failed"]).optional().describe("Whether the SPF record is set up correctly. Possible values: \"unknown\", \"verified\", \"failed\""),
    updated_at: z.string().datetime().optional().describe("When the address was updated"),
  }).optional(),
})

export const createSupportAddress = pikkuSessionlessFunc({
  description: "Adds a Zendesk or external support address to your account.\n\nTo add a Zendesk address, use the following syntax: `{local-part}@{accountname}.zendesk.com`.\nExample: 'sales-team@example.zendesk.com'. The [local-part](https://en.wikipedia.org/wiki/Email_address#Local-part) can be anything you like.\n\nTo add an external email address such as help@omniwearshop.com, the email must already exist and you must set up forwarding on your email server. The exact steps depend on your mail server. See [Forwarding incoming email to Zendesk Support](https://support.zendesk.com/hc/en-us/articles/4408836514202). After setting up forwarding, run the [Verify Support Address Forwarding](#verify-support-address-forwarding) endpoint. The address won't work in Zendesk Support until it's been verified.\n\n#### Allowed For\n\n* Admins\n* Agents with permission to manage channels and extensions. See the system permissions in [Creating custom agent roles](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) in Zendesk help",
  output: CreateSupportAddressOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/recipient_addresses") as any
  },
})
