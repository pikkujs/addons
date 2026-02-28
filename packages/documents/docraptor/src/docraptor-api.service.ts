import type { DocraptorSecrets } from './docraptor.secret.js'

const BASE_URL = 'https://docraptor.com'

export interface DocCreateOptions {
  name: string
  document_type: 'pdf' | 'xls' | 'xlsx'
  document_content?: string
  document_url?: string
  test?: boolean
  javascript?: boolean
  prince_options?: Record<string, unknown>
}

export class DocraptorService {
  private authHeader: string

  constructor(apiKey: DocraptorSecrets) {
    this.authHeader = `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`
  }

  async createDocument(options: DocCreateOptions): Promise<ArrayBuffer> {
    const response = await fetch(`${BASE_URL}/docs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authHeader,
      },
      body: JSON.stringify({ doc: options }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`DocRaptor API error (${response.status}): ${errorText}`)
    }

    return response.arrayBuffer()
  }

  async createAsyncDocument(options: DocCreateOptions): Promise<{ status_id: string }> {
    const response = await fetch(`${BASE_URL}/docs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authHeader,
      },
      body: JSON.stringify({ doc: { ...options, async: true } }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`DocRaptor API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<{ status_id: string }>
  }

  async getAsyncStatus(statusId: string): Promise<{ status: string; download_url?: string }> {
    const response = await fetch(`${BASE_URL}/status/${statusId}`, {
      headers: { 'Authorization': this.authHeader },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`DocRaptor API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<{ status: string; download_url?: string }>
  }
}
