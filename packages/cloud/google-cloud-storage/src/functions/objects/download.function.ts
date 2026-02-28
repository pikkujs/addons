import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObjectDownloadInput = z.object({
  bucketName: z.string().describe('Name of the bucket'),
  objectName: z.string().describe('Name/path of the object'),
})

export const ObjectDownloadOutput = z.object({
  content: z.string().describe('Base64-encoded object content'),
})

export const objectDownload = pikkuSessionlessFunc({
  description: 'Download an object from Google Cloud Storage as base64',
  node: {
    displayName: 'Download Object',
    category: 'Objects',
    type: 'action',
  },
  input: ObjectDownloadInput,
  output: ObjectDownloadOutput,
  func: async ({ googleCloudStorage }, { bucketName, objectName }) => {
    const buffer = await googleCloudStorage.downloadObject(bucketName, objectName)
    return { content: Buffer.from(buffer).toString('base64') }
  },
})
