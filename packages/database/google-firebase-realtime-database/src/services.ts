import { GoogleFirebaseRealtimeDatabaseService } from './google-firebase-realtime-database-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('googleFirebaseRealtimeDatabase')
    if (!cred?.apiKey) {
      throw new Error('Missing googleFirebaseRealtimeDatabase credential')
    }
    const googleFirebaseRealtimeDatabase = new GoogleFirebaseRealtimeDatabaseService(cred, variables)

    return { googleFirebaseRealtimeDatabase }
  }
)
