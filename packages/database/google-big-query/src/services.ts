import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleBigQueryService } from './google-big-query-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleBigQuery')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google BigQuery connection — connect Google BigQuery first')
    }
    const googleBigQuery = new GoogleBigQueryService(cred, variables)

    return { googleBigQuery }
  }
)
