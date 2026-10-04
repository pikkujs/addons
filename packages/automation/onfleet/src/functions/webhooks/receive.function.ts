import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Onfleet webhook source. Answers the `?check=` GET Onfleet validates the URL with and names the event after `triggerName` (`taskCompleted`, `taskArrival`, ...).
 */
export const onfleetWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Onfleet webhook into trigger events',
  func: async (_services, { body, headers, method, query }, { http }) => {
    if (method.toLowerCase() === 'get') {
      http.response.status(200).arrayBuffer(query.check ?? '')
      return
    }
    const data = parseJson(body)
    return {
      events: [{ name: data.triggerName, id: `${data.taskId}:${data.triggerName}:${data.time}`, data }],
    }
  },
})
