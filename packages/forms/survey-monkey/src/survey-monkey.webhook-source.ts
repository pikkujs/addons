import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { surveyMonkeyWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'survey-monkey',
  receive: surveyMonkeyWebhookReceive,
})
