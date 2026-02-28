import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObjectDeleteInput = z.object({
  bucketName: z.string().describe('Name of the bucket'),
  objectName: z.string().describe('Name/path of the object to delete'),
})

export const ObjectDeleteOutput = z.object({
  success: z.boolean().describe('Whether the object was deleted'),
})

export const objectDelete = pikkuSessionlessFunc({
  description: 'Delete an object from a Google Cloud Storage bucket',
  node: {
    displayName: 'Delete Object',
    category: 'Objects',
    type: 'action',
  },
  input: ObjectDeleteInput,
  output: ObjectDeleteOutput,
  func: async ({ googleCloudStorage }, { bucketName, objectName }) => {
    await googleCloudStorage.deleteObject(bucketName, objectName)
    return { success: true }
  },
})
