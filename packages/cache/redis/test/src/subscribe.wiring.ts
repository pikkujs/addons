import { wireTrigger, wireTriggerSource } from '#pikku'
import { subscribe } from '@pikku/addon-redis'
import { onSubscribe } from './on-subscribe.function.js'

wireTrigger({
  name: 'subscribe',
  func: onSubscribe,
})

wireTriggerSource({
  name: 'subscribe',
  func: subscribe,
  input: { channels: new Set(['test-chan']), jsonParseBody: true },
})
