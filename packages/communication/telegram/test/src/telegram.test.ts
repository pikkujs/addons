import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { InMemoryTriggerService, LocalVariablesService, LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'
import { onUpdateMessages } from './on-update.function.js'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

if (!BOT_TOKEN || !CHAT_ID) {
  console.error('Required environment variables:')
  console.error('  TELEGRAM_BOT_TOKEN - Your bot token from @BotFather')
  console.error('  TELEGRAM_CHAT_ID - A chat ID where the bot can send messages')
  process.exit(1)
}

test('telegram external package', async () => {
  console.log(`\n  Testing against real Telegram API`)
  console.log(`  Chat ID: ${CHAT_ID}`)

  const variables = new LocalVariablesService({})
  const secrets = new LocalSecretService(variables)
  await secrets.setSecretJSON('TELEGRAM_BOT_TOKEN', BOT_TOKEN)
  await secrets.setSecretJSON('TELEGRAM_TEST_CHAT_ID', CHAT_ID)

  const singletonServices = await createSingletonServices({}, { variables, secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  const triggerService = new InMemoryTriggerService()
  await triggerService.start()

  try {
    const { passed, failed } = await rpc.invoke('testTelegram', { chatId: CHAT_ID })

    console.log(`\n  ${passed} passed`)
    if (failed.length > 0) {
      console.log(`  ${failed.length} failed:`)
      for (const f of failed) console.log(`    ✗ ${f}`)
    }

    assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)

    // Test trigger - wait for updates from the messages we just sent
    console.log('\n  Testing trigger...')
    console.log('    Waiting for trigger to receive updates (3s)...')
    await new Promise(r => setTimeout(r, 3000))

    if (onUpdateMessages.length > 0) {
      console.log(`    ✓ Trigger received ${onUpdateMessages.length} update(s)`)
    } else {
      console.log('    ⚠ No updates received (bot may not have received messages yet)')
    }
  } finally {
    await triggerService.stop()
    await stopSingletonServices()
  }
})
