import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { surveyMonkeyWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'survey-monkey',
  method: ['head', 'post'],
  verify: {
    hmac: {
      header: 'sm-signature',
      algorithm: 'sha1',
      encoding: 'base64',
    },
  },
  credentialDescription:
    "The key SurveyMonkey signs webhooks with: '<client_id>&<client_secret>'",
  receive: surveyMonkeyWebhookReceive,
})
