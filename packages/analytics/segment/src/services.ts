import { SegmentService } from './segment-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('SEGMENT_CREDENTIALS')
  const segment = new SegmentService(creds)

  return { segment }
})
