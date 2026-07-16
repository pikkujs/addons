import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CertificateGetManyInput = z.object({
  limit: z.number().int().optional(),
})

export const CertificateGetManyOutput = z.record(z.string(), z.unknown())

export const certificateGetMany = pikkuSessionlessFunc({
  description: "Get many certificates",
  input: CertificateGetManyInput,
  output: CertificateGetManyOutput,
  func: async ({ venafiTlsProtectCloud }, data) => {
    return venafiTlsProtectCloud.call("GET", "/outagedetection/v1/certificates", data) as any
  },
})
