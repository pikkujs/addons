import { SegmentService } from './segment-api.service.js'
import type { SegmentSecrets } from './segment.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<SegmentSecrets>('SEGMENT_CREDENTIALS')
  const segment = new SegmentService(creds)

  return { segment }
})
