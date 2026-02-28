import { GoogleCloudStorageService } from './google-cloud-storage-api.service.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets, variables }
) => {
  const projectId = await variables.get('GOOGLE_CLOUD_STORAGE_PROJECT_ID')
  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_STORAGE_PROJECT_ID variable is required')
  }
  const googleCloudStorage = new GoogleCloudStorageService(projectId, secrets)

  return { googleCloudStorage }
})
