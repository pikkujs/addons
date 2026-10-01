import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('QuickBooks webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a QuickBooks webhook source. The CloudEvents format becomes one event per entry, named after its `type` (`qbo.invoice.created.v1`). The legacy format becomes one event per changed entity, named `<Entity>.<Operation>` (`Invoice.Create`), with the company's `realmId` in the data.
 */
export const quickbooksWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a QuickBooks webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    if (Array.isArray(data)) {
      return {
        events: data.map((event: any) => ({ name: event.type, id: event.id, data: event })),
      }
    }
    return {
      events: (data.eventNotifications ?? []).flatMap((notification: any) =>
        (notification.dataChangeEvent?.entities ?? []).map((entity: any) => ({
          name: `${entity.name}.${entity.operation}`,
          id: `${notification.realmId}:${entity.name}:${entity.id}:${entity.lastUpdated}`,
          data: { realmId: notification.realmId, ...entity },
        }))
      ),
    }
  },
})
