import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsCloudFeaturesOutput = z.array(z.object({
  Id: z.number().optional(),
  Title: z.string().optional(),
  Highlight: z.boolean().optional(),
  "Coming Soon": z.boolean().optional(),
}))

export const utilsCloudFeatures = pikkuSessionlessFunc({
  output: UtilsCloudFeaturesOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }) => {
    return nocodb.call("GET", "/api/v2/cloud-features") as any
  },
})
