import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleFirebaseCloudFirestoreBaseUrlSchema = z.enum(["https://firestore.googleapis.com/v1/projects"]).default("https://firestore.googleapis.com/v1/projects")

wireVariable({
  name: 'GOOGLE_FIREBASE_CLOUD_FIRESTORE_BASE_URL',
  displayName: 'Google Cloud Firestore Base URL',
  description: 'The base URL for the Google Cloud Firestore API.',
  variableId: 'GOOGLE_FIREBASE_CLOUD_FIRESTORE_BASE_URL',
  schema: googleFirebaseCloudFirestoreBaseUrlSchema,
})
