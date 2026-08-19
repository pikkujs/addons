import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteRecipientAddressInput = z.object({
  support_address_id: z.number().int().describe("The ID of the support address. Example: 33"),
})

export const deleteRecipientAddress = pikkuSessionlessFunc({
  description: "Deletes a support address.\n\n#### Allowed For\n\n* Admins\n* Agents with permission to manage channels and extensions. See the system permissions in [Creating custom agent roles](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) in Zendesk help",
  input: DeleteRecipientAddressInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/recipient_addresses/{support_address_id}", data)
  },
})
