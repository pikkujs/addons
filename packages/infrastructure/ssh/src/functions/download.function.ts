import { z } from 'zod'
import { Readable } from 'node:stream'
import { pikkuSessionlessFunc } from '#pikku'

export const SshDownloadInput = z.object({
  remotePath: z.string().describe('Remote file path to download'),
  outputContentKey: z.string().describe('Content key to save the downloaded file'),
})

export const SshDownloadOutput = z.object({
  outputContentKey: z.string().describe('Content key of the downloaded file'),
  size: z.number().describe('Size of the downloaded file in bytes'),
})

export const sshDownload = pikkuSessionlessFunc({
  description: 'Download a file from a remote server via SFTP',
  input: SshDownloadInput,
  output: SshDownloadOutput,
  node: { displayName: 'SSH Download', category: 'Infrastructure', type: 'action' },
  func: async ({ sshClient, content }, { remotePath, outputContentKey }) => {
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      sshClient.sftp((err, sftp) => {
        if (err) return reject(err)

        const chunks: Buffer[] = []
        const readStream = sftp.createReadStream(remotePath)
        readStream.on('data', (chunk: Buffer) => chunks.push(chunk))
        readStream.on('end', () => {
          sftp.end()
          resolve(Buffer.concat(chunks))
        })
        readStream.on('error', (e: Error) => {
          sftp.end()
          reject(e)
        })
      })
    })

    await content.writeFile(outputContentKey, Readable.from(buffer))

    return { outputContentKey, size: buffer.length }
  },
})
