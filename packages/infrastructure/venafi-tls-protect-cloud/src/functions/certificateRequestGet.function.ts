import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CertificateRequestGetInput = z.object({
  id: z.string(),
})

export const CertificateRequestGetOutput = z.record(z.string(), z.unknown())

export const certificateRequestGet = pikkuSessionlessFunc({
  description: "Get a certificate request by id",
  input: CertificateRequestGetInput,
  output: CertificateRequestGetOutput,
  func: async ({ venafiTlsProtectCloud }, data) => {
    return venafiTlsProtectCloud.call("GET", "/outagedetection/v1/certificaterequests/{id}", data) as any
  },
})
