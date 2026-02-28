import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileUploadInput = z.object({
  contentKey: z.string().describe('The content key for the audio file in the content service'),
  fileName: z.string().describe('The file name with extension (e.g. "audio.mp3")'),
})

export const FileUploadOutput = z.object({
  uploadUrl: z.string(),
})

export const uploadFile = pikkuSessionlessFunc({
  description: 'Uploads an audio file to AssemblyAI for transcription',
  node: { displayName: 'Upload File', category: 'File', type: 'action' },
  input: FileUploadInput,
  output: FileUploadOutput,
  func: async ({ assemblyai, content }, { contentKey }) => {
    const stream = await content.readFile(contentKey)
    const chunks: Uint8Array[] = []
    for await (const chunk of stream as AsyncIterable<Uint8Array>) {
      chunks.push(chunk)
    }
    const combined = new Uint8Array(chunks.reduce((acc, c) => acc + c.length, 0))
    let offset = 0
    for (const chunk of chunks) {
      combined.set(chunk, offset)
      offset += chunk.length
    }

    const result = await assemblyai.uploadFile(combined)
    return { uploadUrl: result.upload_url }
  },
})
