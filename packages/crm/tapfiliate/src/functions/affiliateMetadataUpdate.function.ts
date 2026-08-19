import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AffiliateMetadataUpdateInput = z.object({
  affiliateId: z.string(),
  key: z.string().optional(),
  value: z.string().optional(),
})

export const AffiliateMetadataUpdateOutput = z.record(z.string(), z.unknown())

export const affiliateMetadataUpdate = pikkuSessionlessFunc({
  description: "Update affiliate metadata",
  input: AffiliateMetadataUpdateInput,
  output: AffiliateMetadataUpdateOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("PUT", "/affiliates/{affiliateId}/meta-data/", data) as any
  },
})
