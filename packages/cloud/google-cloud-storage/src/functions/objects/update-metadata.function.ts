import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObjectUpdateMetadataInput = z.object({
  bucketName: z.string().describe('Name of the bucket'),
  objectName: z.string().describe('Name/path of the object'),
  metadata: z.record(z.string(), z.string()).describe('Custom metadata key-value pairs to set'),
})

export const ObjectUpdateMetadataOutput = z.object({
  name: z.string().describe('Object name'),
  bucket: z.string().describe('Bucket name'),
  updated: z.string().describe('Last update timestamp'),
})

export const objectUpdateMetadata = pikkuSessionlessFunc({
  description: 'Update custom metadata on a Google Cloud Storage object',
  node: {
    displayName: 'Update Object Metadata',
    category: 'Objects',
    type: 'action',
  },
  input: ObjectUpdateMetadataInput,
  output: ObjectUpdateMetadataOutput,
  func: async ({ googleCloudStorage }, { bucketName, objectName, metadata }) => {
    const obj = await googleCloudStorage.updateObjectMetadata(bucketName, objectName, metadata)
    return {
      name: obj.name,
      bucket: obj.bucket,
      updated: obj.updated,
    }
  },
})
