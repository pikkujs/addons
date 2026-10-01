import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { plentymarketsWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'plentymarkets',
  receive: plentymarketsWebhookReceive,
})
