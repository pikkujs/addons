export interface WhisperASROptions {
  output: 'json' | 'text'
  task: 'transcribe' | 'translate'
  language?: string
}

export class WhisperASRService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async transcribe(audio: Uint8Array, fileName: string, options: WhisperASROptions): Promise<any> {
    const params = new URLSearchParams()
    params.set('output', options.output)
    params.set('task', options.task)
    params.set('encode', 'false')
    if (options.language) {
      params.set('language', options.language)
    }

    const formData = new FormData()
    const ab = new ArrayBuffer(audio.byteLength)
    new Uint8Array(ab).set(audio)
    formData.append('audio_file', new Blob([ab]), fileName)

    const response = await fetch(`${this.baseURL}/asr?${params}`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`Whisper ASR failed (${response.status}): ${body}`)
    }

    if (options.output === 'text') {
      return await response.text()
    }

    return await response.json()
  }
}
