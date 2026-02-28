import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObjectListInput = z.object({
  bucketName: z.string().describe('Name of the bucket'),
  prefix: z.string().optional().describe('Filter objects by name prefix (e.g., folder/)'),
  delimiter: z.string().optional().describe('Delimiter for directory-like listing (typically /)'),
  maxResults: z.number().int().optional().describe('Maximum number of objects to return'),
  pageToken: z.string().optional().describe('Page token for pagination'),
})

const ObjectSummarySchema = z.object({
  name: z.string().describe('Object name'),
  contentType: z.string().describe('Content type'),
  size: z.string().describe('Size in bytes'),
  timeCreated: z.string().describe('Creation timestamp'),
  updated: z.string().describe('Last update timestamp'),
})

export const ObjectListOutput = z.object({
  objects: z.array(ObjectSummarySchema).describe('List of objects'),
  prefixes: z.array(z.string()).optional().describe('Common prefixes (subdirectories) when delimiter is used'),
  nextPageToken: z.string().optional().describe('Token for next page of results'),
})

export const objectList = pikkuSessionlessFunc({
  description: 'List objects in a Google Cloud Storage bucket',
  node: {
    displayName: 'List Objects',
    category: 'Objects',
    type: 'action',
  },
  input: ObjectListInput,
  output: ObjectListOutput,
  func: async ({ googleCloudStorage }, { bucketName, prefix, delimiter, maxResults, pageToken }) => {
    const result = await googleCloudStorage.listObjects(bucketName, { prefix, delimiter, maxResults, pageToken })
    return {
      objects: (result.items ?? []).map((o) => ({
        name: o.name,
        contentType: o.contentType,
        size: o.size,
        timeCreated: o.timeCreated,
        updated: o.updated,
      })),
      prefixes: result.prefixes,
      nextPageToken: result.nextPageToken,
    }
  },
})
