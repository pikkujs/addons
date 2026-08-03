import { GoogleCloudStorageService } from './google-cloud-storage-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { credentials, variables }
) => {
  const projectId = await variables.get('GOOGLE_CLOUD_STORAGE_PROJECT_ID')
  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_STORAGE_PROJECT_ID variable is required')
  }
  const googleCloudStorage = new GoogleCloudStorageService(projectId, credentials)

  return { googleCloudStorage }
})
