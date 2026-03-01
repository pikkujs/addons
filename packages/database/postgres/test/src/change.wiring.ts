import { wireTrigger, wireTriggerSource } from '#pikku'
import { onChanges } from '@pikku/addon-postgres'
import { onChange } from './on-change.function.js'

wireTrigger({
  name: 'onChange',
  func: onChange,
})

wireTriggerSource({
  name: 'onChange',
  func: onChanges,
  input: { events: ['DELETE','INSERT','UPDATE'], table: 'pikku_test_items' },
})
