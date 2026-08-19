import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CertificateRequestGetManyInput = z.object({
  limit: z.number().int().optional(),
})

export const CertificateRequestGetManyOutput = z.record(z.string(), z.unknown())

export const certificateRequestGetMany = pikkuSessionlessFunc({
  description: "Get many certificate requests",
  input: CertificateRequestGetManyInput,
  output: CertificateRequestGetManyOutput,
  func: async ({ venafiTlsProtectCloud }, data) => {
    return venafiTlsProtectCloud.call("GET", "/outagedetection/v1/certificaterequests", data) as any
  },
})
