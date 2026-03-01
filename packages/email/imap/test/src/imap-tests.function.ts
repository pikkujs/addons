import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestImapInput = {}
export type TestImapOutput = { passed: number; failed: string[] }

export const testImap = pikkuSessionlessFunc<TestImapInput, TestImapOutput>({
  func: async (_services, _data, { rpc }) => {
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

    // -- Mailboxes --
    await run('listMailboxes returns mailbox list', async () => {
      const result = await rpc.invoke('imap:listMailboxes', {})
      assert.ok(Array.isArray(result.mailboxes), 'Expected mailboxes array')
      const inbox = result.mailboxes.find((m: any) => m.name === 'INBOX')
      assert.ok(inbox, 'Expected INBOX mailbox')
    })

    // -- Search --
    await run('searchEmails finds test emails', async () => {
      const result = await rpc.invoke('imap:searchEmails', {
        mailbox: 'INBOX',
        unseen: false,
        limit: 50,
      })
      assert.ok(Array.isArray(result.emails), 'Expected emails array')
      assert.ok(result.emails.length >= 2, `Expected at least 2 emails, got ${result.emails.length}`)
      assert.ok(result.total >= 2, 'Expected total >= 2')
    })

    await run('searchEmails filters by subject', async () => {
      const result = await rpc.invoke('imap:searchEmails', {
        mailbox: 'INBOX',
        unseen: false,
        subject: 'Test Email 1',
      })
      assert.ok(result.emails.length >= 1, 'Expected to find email with subject')
    })

    // -- Get email --
    let emailUid: number

    await run('getEmail retrieves email content', async () => {
      const search = await rpc.invoke('imap:searchEmails', {
        mailbox: 'INBOX',
        unseen: false,
        limit: 1,
      })
      emailUid = search.emails[0].uid
      const result = await rpc.invoke('imap:getEmail', {
        mailbox: 'INBOX',
        uid: emailUid,
      })
      assert.ok(result.subject, 'Expected subject')
      assert.ok(result.from, 'Expected from')
      assert.ok(result.textPlain || result.textHtml, 'Expected email body')
    })

    // -- Mark as read/unread --
    await run('markAsRead marks email', async () => {
      const result = await rpc.invoke('imap:markAsRead', {
        mailbox: 'INBOX',
        uids: [emailUid],
      })
      assert.equal(result.success, true)
      assert.equal(result.marked, 1)
    })

    await run('markAsUnread marks email', async () => {
      const result = await rpc.invoke('imap:markAsUnread', {
        mailbox: 'INBOX',
        uids: [emailUid],
      })
      assert.equal(result.success, true)
      assert.equal(result.marked, 1)
    })

    // -- Delete --
    await run('deleteEmail removes email', async () => {
      // Get the second email to delete (keep first for other tests)
      const search = await rpc.invoke('imap:searchEmails', {
        mailbox: 'INBOX',
        unseen: false,
        subject: 'Test Email 2',
      })
      assert.ok(search.emails.length > 0, 'Expected email to delete')
      const result = await rpc.invoke('imap:deleteEmail', {
        mailbox: 'INBOX',
        uids: [search.emails[0].uid],
      })
      assert.equal(result.success, true)
    })

    return { passed, failed }
  }
})
