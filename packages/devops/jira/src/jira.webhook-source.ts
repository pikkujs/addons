import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { jiraWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'jira',
  receive: jiraWebhookReceive,
})
