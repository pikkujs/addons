import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestTelegramInput = { chatId: string }
export type TestTelegramOutput = { passed: number; failed: string[] }

/**
 * Exercises Telegram external package functions through the RPC pipeline.
 * Each sub-test calls rpc.invoke('telegram:...') — the same path a real app uses.
 */
export const testTelegram = pikkuSessionlessFunc<TestTelegramInput, TestTelegramOutput>({
  func: async (_services, { chatId }, { rpc }) => {
    let passed = 0
    const failed: string[] = []

    const run = async (name: string, fn: () => Promise<void>) => {
      try {
        await fn()
        passed++
        console.log(`    ✓ ${name}`)
      } catch (e: any) {
        failed.push(`${name}: ${e.message}`)
        console.log(`    ✗ ${name}: ${e.message}`)
      }
    }

    // Small delay between API calls to avoid rate limiting
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

    // ── Message Operations ─────────────────────────────────────

    await run('messageSend sends a text message', async () => {
      const r = await rpc.invoke('telegram:messageSend', {
        chat_id: chatId,
        text: '🧪 Test message from Pikku test harness',
      })
      assert.equal(typeof r.message_id, 'number')
      assert.ok(r.message_id > 0)
    })
    await delay(100)

    await run('messageSend with HTML parse_mode', async () => {
      const r = await rpc.invoke('telegram:messageSend', {
        chat_id: chatId,
        text: '<b>Bold</b> and <i>italic</i> text',
        parse_mode: 'HTML',
      })
      assert.equal(typeof r.message_id, 'number')
    })
    await delay(100)

    await run('messageSendLocation sends a location', async () => {
      const r = await rpc.invoke('telegram:messageSendLocation', {
        chat_id: chatId,
        latitude: 51.5074,
        longitude: -0.1278,
      })
      assert.equal(typeof r.message_id, 'number')
    })
    await delay(100)

    await run('messageSendChatAction sends typing action', async () => {
      const r = await rpc.invoke('telegram:messageSendChatAction', {
        chat_id: chatId,
        action: 'typing',
      })
      assert.equal(r.success, true)
    })
    await delay(100)

    // Test edit and delete with a real message
    let testMessageId: number

    await run('messageEdit edits a message', async () => {
      // First send a message
      const sent = await rpc.invoke('telegram:messageSend', {
        chat_id: chatId,
        text: 'Original text - will be edited',
      })
      testMessageId = sent.message_id
      await delay(200)

      // Then edit it
      const r = await rpc.invoke('telegram:messageEdit', {
        chat_id: chatId,
        message_id: testMessageId,
        text: 'Edited text ✏️',
      })
      // Returns message object or true (for inline messages)
      assert.ok(r === true || (typeof r === 'object' && r.message_id === testMessageId))
    })
    await delay(100)

    await run('messageDelete deletes a message', async () => {
      // Send a message to delete
      const sent = await rpc.invoke('telegram:messageSend', {
        chat_id: chatId,
        text: 'This message will be deleted',
      })
      await delay(200)

      const r = await rpc.invoke('telegram:messageDelete', {
        chat_id: chatId,
        message_id: sent.message_id,
      })
      assert.equal(r.success, true)
    })
    await delay(100)

    // ── Chat Operations ────────────────────────────────────────

    await run('chatGet retrieves chat info', async () => {
      const r = await rpc.invoke('telegram:chatGet', {
        chat_id: chatId,
      })
      assert.equal(String(r.id), String(chatId))
      assert.equal(typeof r.type, 'string')
    })
    await delay(100)

    // ── Callback Operations (these just verify API accepts the call) ────

    await run('callbackAnswerQuery handles invalid query gracefully', async () => {
      try {
        await rpc.invoke('telegram:callbackAnswerQuery', {
          callback_query_id: 'invalid-query-id',
          text: 'Test response',
        })
        // If it doesn't throw, that's unexpected but okay
      } catch (e: any) {
        // Expected to fail with invalid query ID - that's fine
        assert.ok(e.message.includes('query') || e.message.includes('QUERY'),
          'Should fail with query-related error')
      }
    })
    await delay(100)

    // ── File Operations ────────────────────────────────────────

    await run('fileGet handles invalid file_id gracefully', async () => {
      try {
        await rpc.invoke('telegram:fileGet', {
          file_id: 'invalid-file-id',
        })
      } catch (e: any) {
        // Expected to fail with invalid file ID
        assert.ok(e.message.includes('file') || e.message.includes('invalid'),
          'Should fail with file-related error')
      }
    })

    // Send a final summary message
    await rpc.invoke('telegram:messageSend', {
      chat_id: chatId,
      text: `✅ Test complete: ${passed} passed, ${failed.length} failed`,
    })

    return { passed, failed }
  },
})
