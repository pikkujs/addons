import { Redis } from 'ioredis'
import { pikkuAddonServices } from '#pikku'

export class RedisService extends Redis {
  async stop() {
    await this.quit()
  }
}

export const createSingletonServices = pikkuAddonServices(async (config, { variables, secrets }) => {
  const params = await variables.getJSON<{ host: string; port: string; database: string; tls?: string }>('REDIS_PARAMS')
  const host = params?.host ?? 'localhost'
  const port = parseInt(params?.port ?? '6379', 10)
  const database = parseInt(params?.database ?? '0', 10)
  const tls = params?.tls === 'true'
  const password = await secrets.getSecret('REDIS_PASSWORD')

  const redis = new RedisService({
    host,
    port,
    password,
    db: database,
    tls: tls ? {} : undefined,
  })

  return { redis }
})
