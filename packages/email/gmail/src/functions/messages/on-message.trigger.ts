import { z } from 'zod'
import { pikkuTriggerFunc } from '#pikku'

export const OnMessageConfig = z.object({
  q: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
  includeSpamTrash: z.boolean().optional().default(false),
  pollInterval: z.number().optional().default(60000),
})

export const OnMessageOutput = z.object({
  id: z.string(),
  threadId: z.string(),
})

export const onMessage = pikkuTriggerFunc({
  node: { displayName: 'On Message Received', category: 'Messages', type: 'trigger' },
  title: 'Gmail Message Received',
  description: 'Triggers when a new message is received in Gmail',
  input: OnMessageConfig,
  output: OnMessageOutput,
  func: async ({ gmail }, config, { trigger }) => {
    let lastHistoryId: string | null = null
    let polling = true

    const poll = async () => {
      try {
        if (!lastHistoryId) {
          const profile = await gmail.request<{ historyId: string }>(
            'GET',
            '/users/me/profile'
          )
          lastHistoryId = profile.historyId
        }

        const qs: Record<string, string | undefined> = {
          startHistoryId: lastHistoryId,
          historyTypes: 'messageAdded',
        }

        if (config.labelIds?.length) {
          qs.labelId = config.labelIds[0]
        }

        const history = await gmail.request<{
          history?: Array<{
            messagesAdded?: Array<{ message: { id: string; threadId: string } }>
          }>
          historyId: string
        }>('GET', '/users/me/history', { qs })

        if (history.history) {
          for (const record of history.history) {
            if (record.messagesAdded) {
              for (const added of record.messagesAdded) {
                trigger.invoke({
                  id: added.message.id,
                  threadId: added.message.threadId,
                })
              }
            }
          }
        }

        lastHistoryId = history.historyId
      } catch (error: any) {
        if (error?.message?.includes('404') || error?.message?.includes('historyId')) {
          const profile = await gmail.request<{ historyId: string }>(
            'GET',
            '/users/me/profile'
          )
          lastHistoryId = profile.historyId
        }
      }
    }

    const intervalId = setInterval(async () => {
      if (polling) {
        await poll()
      }
    }, config.pollInterval)

    await poll()

    return async () => {
      polling = false
      clearInterval(intervalId)
    }
  },
})
