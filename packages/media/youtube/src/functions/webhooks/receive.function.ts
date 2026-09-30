import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

/**
 * The `receive` step of a YouTube webhook source. Answers the PubSubHubbub verification GET (`hub.challenge`), verifies `X-Hub-Signature` (`sha1=...`) over the Atom body, and emits a `video` event per entry with its video and channel id.
 */
export const youtubeWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a YouTube webhook and read it into trigger events',
  func: async ({ youtubeWebhookSecret }, { body, headers, method, query }) => {
    const signing = await youtubeWebhookSecret.load()
    if (method.toLowerCase() === 'get') {
      return { respond: { status: 200, body: query['hub.challenge'] ?? '' } }
    }
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(
      headers['x-hub-signature']?.replace(/^sha1=/, ''),
      'sha1',
      raw,
      'hex'
    )
    const tag = (entry: string, name: string) =>
      entry.match(new RegExp(`<${name}>([^<]*)</${name}>`))?.[1]
    return {
      events: [...raw.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => ({
        name: 'video',
        id: `${tag(entry!, 'yt:videoId')}:${tag(entry!, 'updated')}`,
        data: {
          videoId: tag(entry!, 'yt:videoId'),
          channelId: tag(entry!, 'yt:channelId'),
          title: tag(entry!, 'title'),
          published: tag(entry!, 'published'),
          updated: tag(entry!, 'updated'),
        },
      })),
    }
  },
})
