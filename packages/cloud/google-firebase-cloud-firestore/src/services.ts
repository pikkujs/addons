import { GoogleFirebaseCloudFirestoreService } from './google-firebase-cloud-firestore-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleFirebaseCloudFirestore = new GoogleFirebaseCloudFirestoreService(secrets, variables)

  return { googleFirebaseCloudFirestore }
})
