import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { githubWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'github',
  receive: githubWebhookReceive,
})
