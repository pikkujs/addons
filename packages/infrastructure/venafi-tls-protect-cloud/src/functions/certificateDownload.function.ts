import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CertificateDownloadInput = z.object({
  id: z.string(),
})

export const CertificateDownloadOutput = z.record(z.string(), z.unknown())

export const certificateDownload = pikkuSessionlessFunc({
  description: "Download a certificate",
  input: CertificateDownloadInput,
  output: CertificateDownloadOutput,
  func: async ({ venafiTlsProtectCloud }, data) => {
    return venafiTlsProtectCloud.call("GET", "/outagedetection/v1/certificates/{id}/contents", data) as any
  },
})
