import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CertificateDeleteInput = z.object({
  certificateIds: z.array(z.string()).optional(),
})

export const CertificateDeleteOutput = z.record(z.string(), z.unknown())

export const certificateDelete = pikkuSessionlessFunc({
  description: "Delete certificates",
  input: CertificateDeleteInput,
  output: CertificateDeleteOutput,
  func: async ({ venafiTlsProtectCloud }, data) => {
    return venafiTlsProtectCloud.call("POST", "/outagedetection/v1/certificates/deletion", data) as any
  },
})
