import { GoogleCloudStorageService } from './google-cloud-storage-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

/**
 * Built per wire rather than once per deployment, because
 * `googleCloudStorageOAuth` may be either a single service account or one
 * account per user — the wiring decides, and only the wire knows whose
 * request this is.
 */
export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    const getCredential = wire.getCredential
    if (!getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const projectId = await variables.get('GOOGLE_CLOUD_STORAGE_PROJECT_ID')
    if (!projectId) {
      throw new Error('GOOGLE_CLOUD_STORAGE_PROJECT_ID variable is required')
    }
    const googleCloudStorage = new GoogleCloudStorageService(projectId, {
      getCredential,
    })

    return { googleCloudStorage }
  }
)
