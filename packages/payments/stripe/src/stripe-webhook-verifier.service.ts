import type Stripe from 'stripe'

/**
 * Verifies inbound Stripe webhook signatures.
 *
 * The signing secret is held here rather than read in the handler: since
 * @pikku/core 0.12.74 a wired function's `secrets` is a throwing accessor, and
 * `SecretService` is confined to the service factories. Giving the service the
 * secret when it is constructed is the shape that replaces the old in-function
 * `getSecret` call.
 *
 * An unprovisioned receiver reports `configured === false` and refuses every
 * caller, rather than accepting any.
 */
export class StripeWebhookVerifier {
  /**
   * @param stripe The client whose `webhooks` helper does the verification.
   * @param signingSecret `STRIPE_WEBHOOK_SECRET`, or null when unprovisioned.
   */
  constructor(
    private readonly stripe: Stripe,
    private readonly signingSecret: string | null
  ) {}

  /** Whether a signing secret was provisioned at boot. */
  get configured(): boolean {
    return this.signingSecret !== null
  }

  /**
   * Verify the raw request bytes against the signature header.
   *
   * The body must be the EXACT bytes Stripe sent — a re-stringified parsed body
   * differs in key order and whitespace and never verifies. Uses the async
   * variant so it works on edge/worker runtimes, which have SubtleCrypto but no
   * node crypto.
   */
  async verify(rawBody: Buffer, signature: string): Promise<{ id: string; type: string }> {
    if (!this.signingSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured')
    }
    return (await this.stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      this.signingSecret
    )) as { id: string; type: string }
  }
}
