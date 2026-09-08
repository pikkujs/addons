import { formEncode, type FormValue } from './lib/form-encode.js'

export interface StripeApiError {
  type?: string
  code?: string
  message?: string
}

/**
 * Minimal Stripe v1 client over `fetch`.
 *
 * There is no `stripe` SDK dependency: tenant stages run on Cloudflare Workers
 * where the SDK is heavy and needs its own http-client shim, and every response
 * this addon consumes is parsed by a zod schema anyway.
 *
 * `apiVersion` is only sent when configured. Left unset, Stripe applies the
 * account's own default, which can differ between a sandbox and the live
 * account that later claims it.
 */
export class StripeApi {
  constructor(
    private readonly apiKey: string,
    private readonly apiUrl: string = 'https://api.stripe.com',
    private readonly apiVersion: string | null = null
  ) {}

  async post<T>(path: string, body: Record<string, FormValue> = {}, idempotencyKey?: string): Promise<T> {
    return this.request<T>('POST', path, formEncode(body), idempotencyKey)
  }

  async get<T>(path: string, query: Record<string, FormValue> = {}): Promise<T> {
    const search = formEncode(query)
    return this.request<T>('GET', search ? `${path}?${search}` : path)
  }

  private async request<T>(
    method: 'GET' | 'POST',
    path: string,
    body: string = '',
    idempotencyKey?: string
  ): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
    }
    if (this.apiVersion) {
      headers['Stripe-Version'] = this.apiVersion
    }
    if (method === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      if (idempotencyKey) {
        headers['Idempotency-Key'] = idempotencyKey
      }
    }

    const response = await fetch(`${this.apiUrl}/v1${path}`, {
      method,
      headers,
      ...(method === 'POST' ? { body } : {}),
    })

    const text = await response.text()
    let payload: unknown
    try {
      payload = text ? JSON.parse(text) : {}
    } catch {
      throw new Error(`Stripe ${method} ${path} returned ${response.status} with a non-JSON body`)
    }

    if (!response.ok) {
      const error = (payload as { error?: StripeApiError }).error
      throw new Error(
        `Stripe ${method} ${path} failed (${response.status}): ${error?.message ?? 'unknown error'}` +
          (error?.code ? ` [${error.code}]` : '')
      )
    }

    return payload as T
  }
}
