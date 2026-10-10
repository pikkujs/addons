import type { AnalyticsIdentityResolver } from '@pikku/core/analytics'
import { mintCookie, randomDigits } from '@pikku/core/analytics'
import type { SerializeOptions } from 'cookie'

const NINETY_DAYS_SECONDS = 7_776_000

const DEFAULT_COOKIE: SerializeOptions = {
  path: '/',
  maxAge: NINETY_DAYS_SECONDS,
  sameSite: 'lax',
  secure: true,
}

export interface MetaConversionsIdentityOptions {
  /**
   * Consent purposes required before either cookie is written. Naming them is
   * effectively mandatory: these identify someone to an ad platform, which no
   * audience-measurement exemption covers.
   */
  requires?: string[]
  /** Leave the cookies readable to scripts, for a page that still runs the pixel. */
  readableByScripts?: boolean
  cookie?: SerializeOptions
}

/**
 * Resolves Meta's `fbp` and `fbc`, minting them where the pixel is absent.
 *
 * `_fbp` is a browser-scoped id in the documented `fb.1.<ms>.<random>` format,
 * which Meta explicitly permits generating server-side. `_fbc` is different in
 * kind: it is not invented but derived from the `fbclid` Meta itself put in the
 * URL, so it can only be created on a request that actually carries one — which
 * is why an existing cookie is read on every other request and a missing one is
 * simply absent rather than filled in.
 *
 * Without `fbc` a conversion cannot be attributed to the ad that caused it,
 * which is the difference between Meta counting the event and Meta paying
 * attention to it.
 */
export const metaConversionsIdentity = (
  options: MetaConversionsIdentityOptions = {}
): AnalyticsIdentityResolver => {
  return (wire, resolved) => {
    const cookie: SerializeOptions = {
      ...DEFAULT_COOKIE,
      httpOnly: options.readableByScripts !== true,
      ...options.cookie,
    }
    const mintOptions = {
      cookie,
      requires: options.requires,
      consent: resolved?.consent,
    }

    const fbp = mintCookie(
      wire,
      '_fbp',
      mintOptions,
      () => `fb.1.${Date.now()}.${randomDigits(10)}`
    )

    const clickId = wire.http?.request?.query()['fbclid']
    const fbc =
      typeof clickId === 'string' && clickId.length > 0
        ? mintCookie(
            wire,
            '_fbc',
            { ...mintOptions, overwrite: true },
            () => `fb.1.${Date.now()}.${clickId}`
          )
        : (wire.http?.request?.cookie('_fbc') ?? undefined)

    const vendorIds: Record<string, string> = {}
    if (fbp) vendorIds['fbp'] = fbp
    if (fbc) vendorIds['fbc'] = fbc

    return Object.keys(vendorIds).length === 0 ? undefined : { vendorIds }
  }
}
