import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestGmailInput = {}
export type TestGmailOutput = { passed: number; failed: string[] }

/**
 * Exercises Gmail external package functions through the RPC pipeline.
 * Each sub-test calls rpc.invoke('gmail:...') — the same path a real app uses.
 */
export const testGmail = pikkuSessionlessFunc<TestGmailInput, TestGmailOutput>({
  func: async (_services, _input, { rpc }) => {
    let passed = 0
    const failed: string[] = []

    const run = async (name: string, fn: () => Promise<void>) => {
      try {
        await fn()
        passed++
      } catch (e: any) {
        failed.push(`${name}: ${e.message}`)
      }
    }

    // Track created resources for cleanup
    let testDraftId: string | undefined
    let testLabelId: string | undefined

    // ── Labels ─────────────────────────────────────────────

    await run('labelList returns labels', async () => {
      const r = await rpc.invoke('gmail:labelList', {})
      assert.ok(Array.isArray(r.labels))
      assert.ok(r.labels.length > 0)
      assert.ok(r.labels.some((l: any) => l.name === 'INBOX'))
      console.log(r)
    })

    await run('labelCreate creates a label', async () => {
      const labelName = `pikku-test-${Date.now()}`
      const r = await rpc.invoke('gmail:labelCreate', {
        name: labelName,
        labelListVisibility: 'labelShow',
        messageListVisibility: 'show',
      })
      assert.ok(r.id)
      assert.equal(r.name, labelName)
      testLabelId = r.id
    })

    await run('labelGet retrieves the label', async () => {
      assert.ok(testLabelId, 'Need label from previous test')
      const r = await rpc.invoke('gmail:labelGet', { id: testLabelId })
      assert.equal(r.id, testLabelId)
    })

    // ── Drafts ─────────────────────────────────────────────

    await run('draftCreate creates a draft', async () => {
      const r = await rpc.invoke('gmail:draftCreate', {
        to: [{ email: 'test@example.com' }],
        subject: `Pikku Test Draft ${Date.now()}`,
        body: 'This is a test draft created by pikku test harness.',
        isHtml: false
      })
      assert.ok(r.id)
      assert.ok(r.message?.id)
      testDraftId = r.id
    })

    await run('draftList returns drafts', async () => {
      const r = await rpc.invoke('gmail:draftList', { maxResults: 10 })
      assert.ok(Array.isArray(r.drafts))
    })

    await run('draftGet retrieves the draft', async () => {
      assert.ok(testDraftId, 'Need draft from previous test')
      const r = await rpc.invoke('gmail:draftGet', { id: testDraftId })
      assert.equal(r.id, testDraftId)
    })

    // ── Messages ───────────────────────────────────────────

    await run('messageList returns messages', async () => {
      const r = await rpc.invoke('gmail:messageList', { maxResults: 5 })
      assert.ok(Array.isArray(r.messages))
      assert.ok(typeof r.resultSizeEstimate === 'number')
    })

    await run('messageList with query', async () => {
      const r = await rpc.invoke('gmail:messageList', {
        q: 'in:inbox',
        maxResults: 5,
      })
      assert.ok(Array.isArray(r.messages))
    })

    let testMessageId: string | undefined

    await run('messageGet retrieves a message', async () => {
      const list = await rpc.invoke('gmail:messageList', { maxResults: 1 })
      if (list.messages.length === 0) {
        throw new Error('No messages in mailbox to test')
      }
      testMessageId = list.messages[0].id

      const r = await rpc.invoke('gmail:messageGet', { id: testMessageId })
      assert.equal(r.id, testMessageId)
      assert.ok(r.threadId)
    })

    await run('messageGet with metadata format', async () => {
      assert.ok(testMessageId, 'Need message from previous test')
      const r = await rpc.invoke('gmail:messageGet', {
        id: testMessageId,
        format: 'metadata',
        metadataHeaders: ['From', 'Subject'],
      })
      assert.equal(r.id, testMessageId)
    })

    // ── Threads ────────────────────────────────────────────

    await run('threadList returns threads', async () => {
      const r = await rpc.invoke('gmail:threadList', { maxResults: 5 })
      assert.ok(Array.isArray(r.threads))
      assert.ok(typeof r.resultSizeEstimate === 'number')
    })

    let testThreadId: string | undefined

    await run('threadGet retrieves a thread', async () => {
      const list = await rpc.invoke('gmail:threadList', { maxResults: 1 })
      if (list.threads.length === 0) {
        throw new Error('No threads in mailbox to test')
      }
      testThreadId = list.threads[0].id

      const r = await rpc.invoke('gmail:threadGet', { id: testThreadId })
      assert.equal(r.id, testThreadId)
      assert.ok(Array.isArray(r.messages))
    })

    // ── Cleanup ────────────────────────────────────────────

    await run('draftDelete removes the draft', async () => {
      assert.ok(testDraftId, 'Need draft from previous test')
      const r = await rpc.invoke('gmail:draftDelete', { id: testDraftId })
      assert.equal(r.success, true)
    })

    await run('labelDelete removes the label', async () => {
      assert.ok(testLabelId, 'Need label from previous test')
      const r = await rpc.invoke('gmail:labelDelete', { id: testLabelId })
      assert.equal(r.success, true)
    })

    return { passed, failed }
  },
})
