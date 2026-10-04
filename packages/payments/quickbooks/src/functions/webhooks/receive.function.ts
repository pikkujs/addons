import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a QuickBooks webhook source. The CloudEvents format becomes one event per entry, named after its `type` (`qbo.invoice.created.v1`). The legacy format becomes one event per changed entity, named `<Entity>.<Operation>` (`Invoice.Create`), with the company's `realmId` in the data.
 */
export const quickbooksWebhookReceive = pikkuWebhookReceive({
  description: 'Read a QuickBooks webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
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
