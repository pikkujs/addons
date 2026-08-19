import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const reorderQueues = pikkuSessionlessFunc({
  description: "Alters the evaluation order of OCR queues in the account.\nThe evaluation order is set in a `queue_ids` array in the request body.\n\nYou must include every queue id in your account to reorder the OCR queues. If not, the endpoint will return 400 Bad Request.\n\n#### Allowed For\n\n* Admins",
  func: async ({ zendesk }) => {
    return zendesk.call("PATCH", "/api/v2/queues/order")
  },
})
