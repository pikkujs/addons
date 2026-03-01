const BASE_URL = 'https://api.elevenlabs.io/v1'

export class ElevenLabsService {
  constructor(
    private apiKey: string,
    private baseURL = BASE_URL
  ) {}

  async textToSpeech(
    voiceId: string,
    params: { text: string; model_id?: string; output_format?: string }
  ): Promise<ArrayBuffer> {
    const url = new URL(
      `/v1/text-to-speech/${voiceId}`,
      this.baseURL
    )
    if (params.output_format) {
      url.searchParams.set('output_format', params.output_format)
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: params.text,
        model_id: params.model_id ?? 'eleven_multilingual_v2',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `ElevenLabs TTS error (${response.status}): ${errorText}`
      )
    }

    return response.arrayBuffer()
  }

  async speechToText(
    audio: Uint8Array,
    params?: { model_id?: string; language_code?: string }
  ): Promise<{ text: string }> {
    const formData = new FormData()
    const ab = new ArrayBuffer(audio.byteLength)
    new Uint8Array(ab).set(audio)
    formData.append('file', new Blob([ab]), 'audio.wav')
    formData.append('model_id', params?.model_id ?? 'scribe_v2')
    if (params?.language_code) {
      formData.append('language_code', params.language_code)
    }

    const url = new URL('/v1/speech-to-text', this.baseURL)
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `ElevenLabs STT error (${response.status}): ${errorText}`
      )
    }

    return response.json() as Promise<{ text: string }>
  }
}
