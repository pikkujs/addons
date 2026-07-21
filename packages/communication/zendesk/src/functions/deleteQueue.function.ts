import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteQueueInput = z.object({
  queue_id: z.string().describe("The id of the omnichannel routing queue. Example: \"01HG80ATNNZK1N7XRFVKX48XD6\""),
})

export const deleteQueue = pikkuSessionlessFunc({
  description: "Deletes the queue and related records.\n#### Allowed For\n\n* Admins",
  input: DeleteQueueInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/queues/{queue_id}", data)
  },
})
