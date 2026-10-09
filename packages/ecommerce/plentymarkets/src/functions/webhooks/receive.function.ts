import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { BadRequestError } from '@pikku/core/errors'

/**
 * The `receive` step of a PlentyMarkets webhook source. PlentyMarkets signs
 * nothing, so there is nothing to verify: an event is only a cue to resync the record from PlentyMarkets, so a forged
 * one at worst triggers a redundant resync. The event is named after its
 * `type` (`order.updated`, ...), keyed by PlentyMarkets' own `id`.
 */
export const plentymarketsWebhookReceive = pikkuWebhookReceive({
  description: 'Read a PlentyMarkets webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson<Record<string, unknown>>(body)
    if (typeof data.type !== 'string' || data.id === undefined || data.id === null) {
      throw new BadRequestError("PlentyMarkets webhook is missing 'type' or 'id'")
    }
    return { events: [{ name: data.type, id: String(data.id), data }] }
  },
})
