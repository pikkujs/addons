const encoder = new TextEncoder()

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

const constantTimeEquals = (a: string, b: string): boolean => {
  if (a.length !== b.length) {
    return false
  }
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

const parseHeader = (header: string): { timestamp: number | null; signatures: string[] } => {
  let timestamp: number | null = null
  const signatures: string[] = []
  for (const part of header.split(',')) {
    const [key, value] = part.split('=', 2)
    if (!key || !value) {
      continue
    }
    if (key.trim() === 't') {
      const parsed = Number.parseInt(value, 10)
      timestamp = Number.isNaN(parsed) ? null : parsed
    } else if (key.trim() === 'v1') {
      signatures.push(value)
    }
  }
  return { timestamp, signatures }
}

/**
 * Verifies inbound Stripe webhook signatures without the Stripe SDK.
 *
 * Uses WebCrypto so it runs unchanged on Workers, and compares in constant time
 * because `crypto.timingSafeEqual` does not exist there.
 *
 * An unprovisioned receiver reports `configured === false` and refuses every
 * caller, rather than accepting any.
 */
export class StripeSignature {
  constructor(
    private readonly signingSecret: string | null,
    private readonly toleranceSeconds: number = 300
  ) {}

  get configured(): boolean {
    return this.signingSecret !== null
  }

  async verify(rawBody: string, header: string): Promise<void> {
    if (!this.signingSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured')
    }

    const { timestamp, signatures } = parseHeader(header)
    if (timestamp === null || signatures.length === 0) {
      throw new Error('Malformed stripe-signature header')
    }

    const age = Math.abs(Math.floor(Date.now() / 1000) - timestamp)
    if (age > this.toleranceSeconds) {
      throw new Error(`Stripe webhook timestamp is outside the ${this.toleranceSeconds}s tolerance`)
    }

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.signingSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const expected = toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(`${timestamp}.${rawBody}`)))

    if (!signatures.some((signature) => constantTimeEquals(signature, expected))) {
      throw new Error('Stripe webhook signature does not match')
    }
  }
}
