import { SegmentService } from './segment-api.service.js'
import type { SegmentSecrets } from './segment.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<SegmentSecrets>('SEGMENT_CREDENTIALS')
  const segment = new SegmentService(creds)

  return { segment }
})
