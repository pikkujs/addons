import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleFirebaseCloudFirestoreService } from './google-firebase-cloud-firestore-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleFirebaseCloudFirestore')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Cloud Firestore connection — connect Google Cloud Firestore first')
    }
    const googleFirebaseCloudFirestore = new GoogleFirebaseCloudFirestoreService(cred, variables)

    return { googleFirebaseCloudFirestore }
  }
)
