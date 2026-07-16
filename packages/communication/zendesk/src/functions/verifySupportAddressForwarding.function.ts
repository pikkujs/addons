import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VerifySupportAddressForwardingInput = z.object({
  support_address_id: z.number().int().describe("The ID of the support address. Example: 33"),
})

export const VerifySupportAddressForwardingOutput = z.string().describe("Empty response")

export const verifySupportAddressForwarding = pikkuSessionlessFunc({
  description: "Sends a test email to the specified support address to verify that email forwarding for the address works. An external support address won't work in Zendesk Support until it's verified.\n\n**Note**: You don't need to verify Zendesk system support addresses.\n\nThe endpoint takes the following body: `{\"type\": \"forwarding\"}`. The value of the `type` property defaults to \"forwarding\" if none is specified, but the values \"spf\" and \"dns\" are also accepted.\n\nUse this endpoint after [adding](#create-support-address) an external support address to Zendesk Support and setting up forwarding on your email server. See [Forwarding incoming email to Zendesk Support](https://support.zendesk.com/hc/en-us/articles/4408836514202).\n\nThe endpoint doesn't return the results of the test. Instead, use the [Show Support Address](#show-support-address) endpoint to check that the `forwarding_status` property is \"verified\".\n\nOther verification checks can also be performed using this API. These include SPF checks and DNS checks.\n\nWhen calling the endpoint with `type` set to \"spf\", it will queries the DNS records to check that the SPF records for Zendesk are present for outbound emails.\n\nWhen calling the endpoint with `type` set to \"dns\", it runs checks on your CNAME records to make sure they are set up properly in your DNS.\n\n#### Allowed For\n\n* Admins\n* Agents with permission to manage channels and extensions. See the system permissions in [Creating custom agent roles](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) in Zendesk help",
  input: VerifySupportAddressForwardingInput,
  output: VerifySupportAddressForwardingOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/recipient_addresses/{support_address_id}/verify", data) as any
  },
})
