import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AsanaWebhookCreateInput = z.object({
  resource: z.string().describe('The gid of the project, portfolio or workspace to watch'),
  target: z.string().url().describe("This app's asana webhook route"),
})

export const AsanaWebhookCreateOutput = z.object({
  webhookId: z.string(),
})

/**
 * Creates an Asana webhook as the calling user. Asana makes its handshake
 * before it answers, so a one-time nonce is held in the credential store for
 * that call and put on the target URL: `asanaWebhookReceive` accepts only the
 * handshake that carries it, and stores the secret it brings.
 */
export const asanaWebhookCreate = pikkuSessionlessFunc({
  description: 'Create an Asana webhook pointed at this app',
  input: AsanaWebhookCreateInput,
  output: AsanaWebhookCreateOutput,
  func: async ({ asana, credentialService }, { resource, target }) => {
    if (!credentialService) {
      throw new Error('Storing the Asana webhook secret needs a credentialService')
    }
    const nonce = crypto.randomUUID()
    const url = new URL(target)
    url.searchParams.set('h', nonce)
    await credentialService.set('asanaWebhookPending', nonce)
    try {
      const { data } = await asana.call<{ data: { gid: string } }>('POST', '/webhooks', {
        data: { resource, target: url.toString() },
      })
      return { webhookId: data.gid }
    } finally {
      await credentialService.delete('asanaWebhookPending')
    }
  },
})
