import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObjectUploadInput = z.object({
  bucketName: z.string().describe('Name of the bucket'),
  objectName: z.string().describe('Name/path of the object (e.g., folder/file.txt)'),
  content: z.string().describe('Content to upload (text or base64-encoded binary)'),
  contentType: z.string().describe('MIME type of the content (e.g., text/plain, image/png)'),
  isBase64: z.boolean().optional().describe('Set to true if content is base64-encoded'),
  metadata: z.record(z.string(), z.string()).optional().describe('Custom metadata key-value pairs'),
})

export const ObjectUploadOutput = z.object({
  name: z.string().describe('Object name'),
  bucket: z.string().describe('Bucket name'),
  contentType: z.string().describe('Content type'),
  size: z.string().describe('Object size in bytes'),
  timeCreated: z.string().describe('Creation timestamp'),
})

export const objectUpload = pikkuSessionlessFunc({
  description: 'Upload an object to a Google Cloud Storage bucket',
  node: {
    displayName: 'Upload Object',
    category: 'Objects',
    type: 'action',
  },
  input: ObjectUploadInput,
  output: ObjectUploadOutput,
  func: async ({ googleCloudStorage }, { bucketName, objectName, content, contentType, isBase64, metadata }) => {
    const buffer = isBase64 ? Buffer.from(content, 'base64') : content
    const obj = await googleCloudStorage.uploadObject(bucketName, objectName, buffer, contentType, metadata)
    return {
      name: obj.name,
      bucket: obj.bucket,
      contentType: obj.contentType,
      size: obj.size,
      timeCreated: obj.timeCreated,
    }
  },
})
