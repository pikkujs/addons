import { S3Client } from '@aws-sdk/client-s3'
import type { S3Secrets } from './s3.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets, content }) => {
  const creds = await secrets.getSecretJSON<S3Secrets>('S3_CREDENTIALS')

  const s3Client = new S3Client({
    region: creds.region ?? 'us-east-1',
    credentials: {
      accessKeyId: creds.accessKeyId,
      secretAccessKey: creds.secretAccessKey,
    },
    endpoint: creds.endpoint,
    forcePathStyle: creds.forcePathStyle ?? !!creds.endpoint,
  })

  return {
    s3Client,
    content,
    stop: async () => {
      s3Client.destroy()
    },
  }
})
