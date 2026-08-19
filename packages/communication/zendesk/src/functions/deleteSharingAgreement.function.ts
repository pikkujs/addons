import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteSharingAgreementInput = z.object({
  sharing_agreement_id: z.number().int().describe("The ID of the sharing agreement. Example: 1"),
})

export const deleteSharingAgreement = pikkuSessionlessFunc({
  description: "Deletes a sharing agreement.\n\n#### Allowed For\n\n* Admins",
  input: DeleteSharingAgreementInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/sharing_agreements/{sharing_agreement_id}", data)
  },
})
