const BASE_URL = 'https://api.assemblyai.com/v2'
const STREAMING_URL = 'https://streaming.assemblyai.com/v3'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export interface Transcript {
  id: string
  status: string
  audio_url: string
  text: string | null
  words: Array<{ text: string; start: number; end: number; confidence: number }> | null
  utterances: Array<{ text: string; start: number; end: number; confidence: number; speaker: string }> | null
  error: string | null
  language_model: string
  acoustic_model: string
  language_code: string | null
  audio_duration: number | null
}

export interface TranscriptListResponse {
  page_details: {
    limit: number
    result_count: number
    current_url: string
    prev_url: string | null
    next_url: string | null
  }
  transcripts: Array<{
    id: string
    resource_url: string
    status: string
    created: string
    completed: string | null
    audio_url: string
  }>
}

export interface SentencesResponse {
  id: string
  confidence: number
  audio_duration: number
  sentences: Array<{ text: string; start: number; end: number; confidence: number; words: Array<{ text: string; start: number; end: number; confidence: number }> }>
}

export interface ParagraphsResponse {
  id: string
  confidence: number
  audio_duration: number
  paragraphs: Array<{ text: string; start: number; end: number; confidence: number; words: Array<{ text: string; start: number; end: number; confidence: number }> }>
}

export interface WordSearchResponse {
  id: string
  total_count: number
  matches: Array<{ text: string; count: number; timestamps: Array<{ start: number; end: number }> }>
}

export interface RedactedAudioResponse {
  status: string
  redacted_audio_url: string
}

export class AssemblyaiService {
  constructor(private apiKey: string) {}

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(endpoint, BASE_URL)

    if (options?.qs) {
      for (const [key, value] of Object.entries(options.qs)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.apiKey,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`AssemblyAI API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  async requestText(
    method: 'GET' | 'POST',
    endpoint: string,
    options?: RequestOptions
  ): Promise<string> {
    const url = new URL(endpoint, BASE_URL)

    if (options?.qs) {
      for (const [key, value] of Object.entries(options.qs)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Authorization': this.apiKey,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`AssemblyAI API error (${response.status}): ${errorText}`)
    }

    return response.text()
  }

  // File
  async uploadFile(audioData: Uint8Array): Promise<{ upload_url: string }> {
    const ab = new ArrayBuffer(audioData.byteLength)
    new Uint8Array(ab).set(audioData)

    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': this.apiKey,
        'Content-Type': 'application/octet-stream',
      },
      body: new Blob([ab]),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`AssemblyAI API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<{ upload_url: string }>
  }

  // Transcripts
  async createTranscript(params: {
    audio_url: string
    language_code?: string
    speaker_labels?: boolean
    auto_chapters?: boolean
    entity_detection?: boolean
    sentiment_analysis?: boolean
    auto_highlights?: boolean
    redact_pii?: boolean
    redact_pii_policies?: string[]
    webhook_url?: string
  }): Promise<Transcript> {
    return this.request<Transcript>('POST', '/transcript', { body: params })
  }

  async getTranscript(transcriptId: string): Promise<Transcript> {
    return this.request<Transcript>('GET', `/transcript/${transcriptId}`)
  }

  async listTranscripts(params?: { limit?: number; status?: string; before_id?: string; after_id?: string }): Promise<TranscriptListResponse> {
    return this.request<TranscriptListResponse>('GET', '/transcript', { qs: params })
  }

  async deleteTranscript(transcriptId: string): Promise<Transcript> {
    return this.request<Transcript>('DELETE', `/transcript/${transcriptId}`)
  }

  async getSentences(transcriptId: string): Promise<SentencesResponse> {
    return this.request<SentencesResponse>('GET', `/transcript/${transcriptId}/sentences`)
  }

  async getParagraphs(transcriptId: string): Promise<ParagraphsResponse> {
    return this.request<ParagraphsResponse>('GET', `/transcript/${transcriptId}/paragraphs`)
  }

  async getSubtitles(transcriptId: string, format: 'srt' | 'vtt', charsPerCaption?: number): Promise<string> {
    const qs: Record<string, string | number | undefined> = {}
    if (charsPerCaption) qs.chars_per_caption = charsPerCaption
    return this.requestText('GET', `/transcript/${transcriptId}/${format}`, { qs })
  }

  async getRedactedAudio(transcriptId: string): Promise<RedactedAudioResponse> {
    return this.request<RedactedAudioResponse>('GET', `/transcript/${transcriptId}/redacted-audio`)
  }

  async wordSearch(transcriptId: string, words: string[]): Promise<WordSearchResponse> {
    return this.request<WordSearchResponse>('GET', `/transcript/${transcriptId}/word-search`, {
      qs: { words: words.join(',') },
    })
  }

  // Streaming
  async createStreamingToken(expiresInSeconds: number, maxSessionDurationSeconds?: number): Promise<{ token: string; expires_in_seconds: number }> {
    const url = new URL('/v3/token', STREAMING_URL)
    url.searchParams.set('expires_in_seconds', String(expiresInSeconds))
    if (maxSessionDurationSeconds) {
      url.searchParams.set('max_session_duration_seconds', String(maxSessionDurationSeconds))
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': this.apiKey,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`AssemblyAI API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<{ token: string; expires_in_seconds: number }>
  }
}
