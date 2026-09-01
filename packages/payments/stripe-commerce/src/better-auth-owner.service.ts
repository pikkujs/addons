import type { Kysely } from 'kysely'
import type { CoreUserSession } from '@pikku/core/types'
import type { PaymentOwner, PaymentOwnerRef } from './payment-owner.service.js'

type Logger = { debug: (message: string) => void }

type BetterAuthTables = {
  user: { id: string; email: string | null; stripeCustomerId: string | null }
  organization: { id: string; stripeCustomerId: string | null }
}

/**
 * Resolves the owner from the session and picks up the Stripe customer
 * better-auth already made for it.
 *
 * better-auth's Stripe plugin owns subscriptions and keeps a
 * `stripeCustomerId` on `user`, `organization` and every `subscription` row.
 * Reading it here is the whole integration: the storefront adopts that customer
 * instead of minting a second, so an app's plan subscription and its orders sit
 * on one Stripe Customer. Nothing is imported from better-auth — the tables are
 * in the same database, and the id is the only fact the addon needs.
 *
 * An app with no better-auth Stripe plugin behaves as
 * {@link SessionPaymentOwner} does: the lookup is probed once, and a missing
 * table or column turns it off for the life of the process rather than failing
 * a checkout.
 */
export class BetterAuthPaymentOwner implements PaymentOwner {
  private available = true

  constructor(
    private readonly kysely: Kysely<BetterAuthTables>,
    private readonly ownerType: 'user' | 'organization' = 'user',
    private readonly logger?: Logger
  ) {}

  async resolve(session?: CoreUserSession): Promise<PaymentOwnerRef | null> {
    const id = this.ownerType === 'organization' ? session?.orgId : session?.userId
    if (!id) {
      return null
    }

    if (!this.available) {
      return { type: this.ownerType, id }
    }

    try {
      const row =
        this.ownerType === 'organization'
          ? await this.kysely
              .selectFrom('organization')
              .select(['stripeCustomerId'])
              .where('id', '=', id)
              .executeTakeFirst()
          : await this.kysely
              .selectFrom('user')
              .select(['stripeCustomerId', 'email'])
              .where('id', '=', id)
              .executeTakeFirst()

      return {
        type: this.ownerType,
        id,
        email: (row as { email?: string | null } | undefined)?.email ?? null,
        stripeCustomerId: row?.stripeCustomerId ?? null,
      }
    } catch (error) {
      this.available = false
      this.logger?.debug(
        `no better-auth stripe customer to read (${(error as Error).message}) — falling back to the session`
      )
      return { type: this.ownerType, id }
    }
  }
}
