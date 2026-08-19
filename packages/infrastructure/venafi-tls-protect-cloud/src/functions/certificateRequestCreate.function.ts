import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CertificateRequestCreateInput = z.object({
  applicationId: z.string().optional(),
  certificateIssuingTemplateId: z.string().optional(),
  certificateSigningRequest: z.string().optional(),
  isVaaSGenerated: z.boolean().optional(),
})

export const CertificateRequestCreateOutput = z.record(z.string(), z.unknown())

export const certificateRequestCreate = pikkuSessionlessFunc({
  description: "Create a certificate request",
  input: CertificateRequestCreateInput,
  output: CertificateRequestCreateOutput,
  func: async ({ venafiTlsProtectCloud }, data) => {
    return venafiTlsProtectCloud.call("POST", "/outagedetection/v1/certificaterequests", data) as any
  },
})
