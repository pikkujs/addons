import { wireTrigger, wireTriggerSource } from '#pikku'
import { onUpdate } from '@pikku/addon-telegram'
import { onUpdate as handleUpdate } from './on-update.function.js'

wireTrigger({
  name: 'telegramUpdate',
  func: handleUpdate,
})

wireTriggerSource({
  name: 'telegramUpdate',
  func: onUpdate,
  input: {
    allowedUpdates: ['message'],
    pollInterval: 1000,
  },
})
