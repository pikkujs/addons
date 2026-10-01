import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import { formstackWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'formstack',
  verify: ({ body, headers }, secret) => {
    const raw = new TextDecoder().decode(body)
    const { HandshakeKey } = headers['content-type']?.includes('json')
      ? JSON.parse(raw)
      : Object.fromEntries(new URLSearchParams(raw))
    return !!HandshakeKey && timingSafeStringEqual(HandshakeKey, secret)
  },
  credentialDescription:
    "The webhook's handshake key",
  receive: formstackWebhookReceive,
})
