import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SshUploadInput = z.object({
  bucket: z.string().describe('Storage bucket containing the file'),
  contentKey: z.string().describe('Content key of the file to upload'),
  remotePath: z.string().describe('Remote file path to upload to'),
})

export const SshUploadOutput = z.object({
  remotePath: z.string().describe('Remote path where the file was uploaded'),
  size: z.number().describe('Size of the uploaded file in bytes'),
})

export const sshUpload = pikkuSessionlessFunc({
  description: 'Upload a file to a remote server via SFTP',
  input: SshUploadInput,
  output: SshUploadOutput,
  node: { displayName: 'SSH Upload', category: 'Infrastructure', type: 'action' },
  func: async ({ sshClient, content }, { bucket, contentKey, remotePath }) => {
    const buffer = await content.readFileAsBuffer({ bucket, key: contentKey })

    await new Promise<void>((resolve, reject) => {
      sshClient.sftp((err, sftp) => {
        if (err) return reject(err)

        const writeStream = sftp.createWriteStream(remotePath)
        writeStream.on('close', () => {
          sftp.end()
          resolve()
        })
        writeStream.on('error', (e: Error) => {
          sftp.end()
          reject(e)
        })
        writeStream.end(buffer)
      })
    })

    return { remotePath, size: buffer.length }
  },
})
