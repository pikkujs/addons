import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CertificateGetInput = z.object({
  id: z.string(),
})

export const CertificateGetOutput = z.record(z.string(), z.unknown())

export const certificateGet = pikkuSessionlessFunc({
  description: "Get a certificate by id",
  input: CertificateGetInput,
  output: CertificateGetOutput,
  func: async ({ venafiTlsProtectCloud }, data) => {
    return venafiTlsProtectCloud.call("GET", "/outagedetection/v1/certificates/{id}", data) as any
  },
})
