import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { gitlabWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'gitlab',
  verify: {
    token: {
      header: 'x-gitlab-token',
    },
  },
  credentialDescription:
    "The secret token set on the GitLab webhook, which GitLab sends in X-Gitlab-Token",
  receive: gitlabWebhookReceive,
})
