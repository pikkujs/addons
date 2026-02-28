import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObjectGetInput = z.object({
  bucketName: z.string().describe('Name of the bucket'),
  objectName: z.string().describe('Name/path of the object'),
})

export const ObjectGetOutput = z.object({
  name: z.string().describe('Object name'),
  bucket: z.string().describe('Bucket name'),
  contentType: z.string().describe('Content type'),
  size: z.string().describe('Object size in bytes'),
  timeCreated: z.string().describe('Creation timestamp'),
  updated: z.string().describe('Last update timestamp'),
  md5Hash: z.string().describe('MD5 hash of the object'),
  mediaLink: z.string().describe('Direct download link'),
})

export const objectGet = pikkuSessionlessFunc({
  description: 'Get metadata for an object in Google Cloud Storage',
  node: {
    displayName: 'Get Object',
    category: 'Objects',
    type: 'action',
  },
  input: ObjectGetInput,
  output: ObjectGetOutput,
  func: async ({ googleCloudStorage }, { bucketName, objectName }) => {
    const obj = await googleCloudStorage.getObject(bucketName, objectName)
    return {
      name: obj.name,
      bucket: obj.bucket,
      contentType: obj.contentType,
      size: obj.size,
      timeCreated: obj.timeCreated,
      updated: obj.updated,
      md5Hash: obj.md5Hash,
      mediaLink: obj.mediaLink,
    }
  },
})
