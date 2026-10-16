import type { AnalyticsIdentityResolver } from '@pikku/core/analytics'
import { mintCookie, randomDigits } from '@pikku/core/analytics'
import type { SerializeOptions } from 'cookie'

const TWO_YEARS_SECONDS = 63_072_000

const DEFAULT_COOKIE: SerializeOptions = {
  path: '/',
  maxAge: TWO_YEARS_SECONDS,
  sameSite: 'lax',
  secure: true,
}

export interface GoogleAnalyticsIdentityOptions {
  /**
   * Consent purposes required before the cookie is written. Naming them is
   * effectively mandatory here: the cookie exists to identify someone to
   * Google, which is not a purpose any exemption covers.
   */
  requires?: string[]
  /**
   * Leave `_ga` readable to scripts, for a page that still runs gtag.js.
   * Defaults to `httpOnly`, which is right when nothing in the browser needs
   * it and also escapes the seven-day cap on script-set cookies.
   */
  readableByScripts?: boolean
  cookie?: SerializeOptions
}

/**
 * Resolves GA4's `client_id`, minting `_ga` when the page has no gtag.js to
 * write it.
 *
 * The format is `GA1.1.<random>.<unix seconds>` and is what Google's own
 * server-side tagging container generates for the same reason — a hit carrying
 * no client id is accepted and attributed to nobody.
 *
 * Minting and reading are the same call deliberately. Where gtag.js is present
 * it has already written the cookie, so this returns the browser's id and joins
 * the two halves; where it is absent this becomes the only writer. Getting that
 * backwards — minting alongside a pixel — is what produces a second,
 * permanently anonymous user beside the real one.
 */
export const googleAnalyticsIdentity = (
  options: GoogleAnalyticsIdentityOptions = {}
): AnalyticsIdentityResolver => {
  return (wire, resolved) => {
    const gaClientId = mintCookie(
      wire,
      '_ga',
      {
        cookie: {
          ...DEFAULT_COOKIE,
          httpOnly: options.readableByScripts !== true,
          ...options.cookie,
        },
        requires: options.requires,
        consent: resolved?.consent,
      },
      () => `GA1.1.${randomDigits(9)}.${Math.floor(Date.now() / 1000)}`
    )

    return gaClientId === undefined ? undefined : { vendorIds: { gaClientId } }
  }
}
