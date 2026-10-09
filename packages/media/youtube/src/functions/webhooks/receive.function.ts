import { pikkuWebhookReceive } from '#pikku/addon/trigger'

/**
 * The `receive` step of a YouTube webhook source. Answers the PubSubHubbub verification GET (`hub.challenge`) and emits a `video` event per entry with its video and channel id.
 */
export const youtubeWebhookReceive = pikkuWebhookReceive({
  description: 'Read a YouTube webhook into trigger events',
  func: async (_services, { body, headers, method, query }, { http }) => {
    if (method.toLowerCase() === 'get') {
      http.response.status(200).arrayBuffer(query['hub.challenge'] ?? '')
      return
    }
    const raw = new TextDecoder().decode(body)
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
