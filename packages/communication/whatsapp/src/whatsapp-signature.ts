import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Verify a WhatsApp Cloud API request signature.
 *
 * Meta signs every webhook POST with HMAC-SHA256 over the raw request body,
 * keyed by your app secret, and sends it as `X-Hub-Signature-256: sha256=<hex>`.
 * Without this check anyone who knows the webhook URL can POST an arbitrary
 * payload with any `from` number.
 *
 * Note that Meta's scheme carries no timestamp, so — unlike Slack — it offers
 * no replay protection. A captured request stays valid until the app secret is
 * rotated.
 *
 * @param appSecret - Your Meta app secret (App Dashboard → Settings → Basic)
 * @param signature - The `X-Hub-Signature-256` header value (`sha256=...`)
 * @param body - The raw request body, exactly as received
 * @returns true if the signature is valid
 */
export function verifyWhatsAppSignature(
  appSecret: string,
  signature: string,
  body: string
): boolean {
  if (!appSecret || !signature.startsWith('sha256=')) {
    return false
  }

  const computed =
    'sha256=' + createHmac('sha256', appSecret).update(body).digest('hex')

  const computedBuffer = Buffer.from(computed)
  const signatureBuffer = Buffer.from(signature)

  // timingSafeEqual throws on length mismatch, which itself leaks length —
  // compare lengths first so both paths stay constant-time for equal lengths.
  if (computedBuffer.length !== signatureBuffer.length) {
    return false
  }

  return timingSafeEqual(computedBuffer, signatureBuffer)
}
