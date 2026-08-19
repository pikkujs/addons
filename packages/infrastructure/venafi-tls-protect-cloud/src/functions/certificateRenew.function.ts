import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CertificateRenewInput = z.object({
  applicationId: z.string().optional(),
  certificateIssuingTemplateId: z.string().optional(),
  certificateSigningRequest: z.string().optional(),
  existingCertificateId: z.string().optional(),
})

export const CertificateRenewOutput = z.record(z.string(), z.unknown())

export const certificateRenew = pikkuSessionlessFunc({
  description: "Renew a certificate",
  input: CertificateRenewInput,
  output: CertificateRenewOutput,
  func: async ({ venafiTlsProtectCloud }, data) => {
    return venafiTlsProtectCloud.call("POST", "/outagedetection/v1/certificaterequests/renew", data) as any
  },
})
