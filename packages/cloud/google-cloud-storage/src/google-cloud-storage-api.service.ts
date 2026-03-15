import { OAuth2Client } from '@pikku/core/oauth2'
import type { OAuth2CredentialConfig } from '@pikku/core/secret'
import type { SecretService } from '@pikku/core'

const BASE_URL = 'https://storage.googleapis.com/storage/v1'
const UPLOAD_URL = 'https://storage.googleapis.com/upload/storage/v1'

export const GCS_OAUTH2_CONFIG: OAuth2CredentialConfig = {
  tokenSecretId: 'GOOGLE_CLOUD_STORAGE_TOKENS',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  scopes: [
    'https://www.googleapis.com/auth/devstorage.full_control',
  ],
  additionalParams: {
    access_type: 'offline',
    prompt: 'consent',
  },
}

export interface GCSObject {
  kind: string
  id: string
  selfLink: string
  name: string
  bucket: string
  generation: string
  metageneration: string
  contentType: string
  timeCreated: string
  updated: string
  size: string
  md5Hash: string
  mediaLink: string
  [key: string]: unknown
}

export interface GCSBucket {
  kind: string
  id: string
  selfLink: string
  name: string
  projectNumber: string
  metageneration: string
  location: string
  storageClass: string
  timeCreated: string
  updated: string
  [key: string]: unknown
}

export class GoogleCloudStorageService {
  private oauth: OAuth2Client

  constructor(private projectId: string, secrets: SecretService) {
    this.oauth = new OAuth2Client(
      GCS_OAUTH2_CONFIG,
      'GOOGLE_CLOUD_STORAGE_APP_CREDENTIALS',
      secrets
    )
  }

  private async request<T>(
    method: string,
    url: string,
    options?: { body?: unknown; headers?: Record<string, string>; rawBody?: Blob | string }
  ): Promise<T> {
    const init: RequestInit = {
      method,
      headers: {
        ...options?.headers,
      },
    }

    if (options?.body && !options.rawBody) {
      (init.headers as Record<string, string>)['Content-Type'] = 'application/json'
    }

    init.body = options?.rawBody ?? (options?.body ? JSON.stringify(options.body) : undefined)

    const response = await this.oauth.request(url, init)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GCS API error (${response.status}): ${errorText}`)
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      return response.json() as Promise<T>
    }
    return {} as T
  }

  private async requestBuffer(method: string, url: string): Promise<ArrayBuffer> {
    const response = await this.oauth.request(url, { method })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GCS API error (${response.status}): ${errorText}`)
    }

    return response.arrayBuffer()
  }

  // Bucket operations

  async createBucket(name: string, options?: { location?: string; storageClass?: string }): Promise<GCSBucket> {
    return this.request<GCSBucket>('POST', `${BASE_URL}/b?project=${this.projectId}`, {
      body: {
        name,
        location: options?.location ?? 'US',
        storageClass: options?.storageClass ?? 'STANDARD',
      },
    })
  }

  async getBucket(bucketName: string): Promise<GCSBucket> {
    return this.request<GCSBucket>('GET', `${BASE_URL}/b/${encodeURIComponent(bucketName)}`)
  }

  async listBuckets(options?: { prefix?: string; maxResults?: number; pageToken?: string }): Promise<{ items: GCSBucket[]; nextPageToken?: string }> {
    const params = new URLSearchParams({ project: this.projectId })
    if (options?.prefix) params.set('prefix', options.prefix)
    if (options?.maxResults) params.set('maxResults', String(options.maxResults))
    if (options?.pageToken) params.set('pageToken', options.pageToken)
    return this.request('GET', `${BASE_URL}/b?${params}`)
  }

  async updateBucket(bucketName: string, metadata: Record<string, unknown>): Promise<GCSBucket> {
    return this.request<GCSBucket>('PATCH', `${BASE_URL}/b/${encodeURIComponent(bucketName)}`, {
      body: metadata,
    })
  }

  async deleteBucket(bucketName: string): Promise<void> {
    await this.request<void>('DELETE', `${BASE_URL}/b/${encodeURIComponent(bucketName)}`)
  }

  // Object operations

  async uploadObject(bucketName: string, objectName: string, content: Buffer | string, contentType: string, metadata?: Record<string, string>): Promise<GCSObject> {
    const boundary = `pikku-${Date.now()}`
    const metadataJson = JSON.stringify({
      name: objectName,
      contentType,
      metadata,
    })

    const bodyParts = [
      `--${boundary}\r\n`,
      'Content-Type: application/json; charset=UTF-8\r\n\r\n',
      metadataJson,
      `\r\n--${boundary}\r\n`,
      `Content-Type: ${contentType}\r\n\r\n`,
    ]

    const contentBuffer = typeof content === 'string' ? new TextEncoder().encode(content) : new Uint8Array(content)
    const ending = new TextEncoder().encode(`\r\n--${boundary}--`)
    const preamble = new TextEncoder().encode(bodyParts.join(''))
    const rawBody = new Blob([preamble, contentBuffer, ending])

    const params = new URLSearchParams({
      uploadType: 'multipart',
      name: objectName,
    })

    return this.request<GCSObject>('POST', `${UPLOAD_URL}/b/${encodeURIComponent(bucketName)}/o?${params}`, {
      rawBody,
      headers: {
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
    })
  }

  async getObject(bucketName: string, objectName: string): Promise<GCSObject> {
    return this.request<GCSObject>('GET', `${BASE_URL}/b/${encodeURIComponent(bucketName)}/o/${encodeURIComponent(objectName)}`)
  }

  async downloadObject(bucketName: string, objectName: string): Promise<ArrayBuffer> {
    return this.requestBuffer('GET', `${BASE_URL}/b/${encodeURIComponent(bucketName)}/o/${encodeURIComponent(objectName)}?alt=media`)
  }

  async listObjects(bucketName: string, options?: { prefix?: string; delimiter?: string; maxResults?: number; pageToken?: string }): Promise<{ items?: GCSObject[]; prefixes?: string[]; nextPageToken?: string }> {
    const params = new URLSearchParams()
    if (options?.prefix) params.set('prefix', options.prefix)
    if (options?.delimiter) params.set('delimiter', options.delimiter)
    if (options?.maxResults) params.set('maxResults', String(options.maxResults))
    if (options?.pageToken) params.set('pageToken', options.pageToken)
    const qs = params.toString()
    return this.request('GET', `${BASE_URL}/b/${encodeURIComponent(bucketName)}/o${qs ? `?${qs}` : ''}`)
  }

  async updateObjectMetadata(bucketName: string, objectName: string, metadata: Record<string, string>): Promise<GCSObject> {
    return this.request<GCSObject>('PATCH', `${BASE_URL}/b/${encodeURIComponent(bucketName)}/o/${encodeURIComponent(objectName)}`, {
      body: { metadata },
    })
  }

  async deleteObject(bucketName: string, objectName: string): Promise<void> {
    await this.request<void>('DELETE', `${BASE_URL}/b/${encodeURIComponent(bucketName)}/o/${encodeURIComponent(objectName)}`)
  }
}
