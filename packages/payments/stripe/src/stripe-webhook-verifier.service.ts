import type Stripe from 'stripe'

/**
 * Verifies inbound Stripe webhook signatures against the signing secret
 * `stripeWebhookSetup` stored in the credential store, read per delivery so a
 * new endpoint's secret takes effect without a deploy. With no secret stored it
 * refuses every caller, rather than accepting any.
 */
export class StripeWebhookVerifier {
  constructor(
    private readonly stripe: Stripe,
    private readonly signingSecret: () => Promise<string | null>
  ) {}

  /**
   * Verify the raw request bytes against the signature header.
   *
   * The body must be the EXACT bytes Stripe sent — a re-stringified parsed body
   * differs in key order and whitespace and never verifies. Uses the async
   * variant so it works on edge/worker runtimes, which have SubtleCrypto but no
   * node crypto.
   */
  async verify(rawBody: Buffer, signature: string): Promise<{ id: string; type: string; data?: { object?: { metadata?: Record<string, unknown> | null } } }> {
    const secret = await this.signingSecret()
    if (!secret) {
      throw new Error('No Stripe webhook signing secret is stored')
    }
    return (await this.stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      secret
    )) as { id: string; type: string; data?: { object?: { metadata?: Record<string, unknown> | null } } }
  }
}
