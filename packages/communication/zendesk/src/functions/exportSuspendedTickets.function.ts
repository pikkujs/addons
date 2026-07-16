import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExportSuspendedTicketsOutput = z.object({
  export: z.object({
    status: z.string().optional(),
    view_id: z.string().optional(),
  }).optional(),
})

export const exportSuspendedTickets = pikkuSessionlessFunc({
  description: "Exports a list of suspended tickets for the Zendesk Support instance. To export the list, the endpoint enqueues a job to create a CSV file with the data. When done, Zendesk sends the requester an email containing a link to the CSV file. In the CSV, tickets are sorted by the update timestamp in ascending order.\n\n #### Allowed For\n\n * Admins and [agents in custom roles with permission](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) to manage suspended tickets on Enterprise plans\n * Unrestricted agents on all other plans\n\n #### Rate limits\n\n Limited to one request per minute and up to one million records in return. The rate-limiting mechanism behaves identically to the one described in [Usage limits](/api-reference/ticketing/account-configuration/usage_limits/#monitoring-your-request-activity).\n We recommend using the `Retry-After` header value as described in [Catching errors caused by rate limiting](/documentation/ticketing/using-the-zendesk-api/best-practices-for-avoiding-rate-limiting#catch).",
  output: ExportSuspendedTicketsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/suspended_tickets/export") as any
  },
})
