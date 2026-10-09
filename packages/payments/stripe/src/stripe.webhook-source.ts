import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import {
  stripeWebhookCheck,
  stripeWebhookReceive,
  stripeWebhookSetup,
  stripeWebhookTeardown,
} from './functions/webhooks/source.function.js'

wireTriggerWebhookSource({
  name: 'stripe',
  receive: stripeWebhookReceive,
  check: stripeWebhookCheck,
  setup: stripeWebhookSetup,
  teardown: stripeWebhookTeardown,
})
