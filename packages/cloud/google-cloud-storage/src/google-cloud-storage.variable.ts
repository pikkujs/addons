import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleCloudStorageProjectIdSchema = z.string()
  .describe('Google Cloud project ID (required for bucket create/list operations)')

defineVariable({
  name: 'googleCloudStorage_projectId',
  displayName: 'Google Cloud Project ID',
  description: 'The Google Cloud project ID for Cloud Storage operations',
  variableId: 'GOOGLE_CLOUD_STORAGE_PROJECT_ID',
  schema: googleCloudStorageProjectIdSchema,
})
