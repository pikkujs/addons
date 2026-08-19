import { defineHTTPRoutes } from '#pikku/addon/http'
import { plentymarketsWebhookHandler } from './functions/webhooks/handle.function.js'

/**
 * The PlentyMarkets webhook ingress ships WITH the addon as a route CONTRACT — addons
 * declare routes with `defineHTTPRoutes` and the consuming app mounts them (an addon
 * may not call `wireHTTP` itself; see PKU920). So a consumer gets a working
 * `POST /webhooks/plentymarkets` by wiring this contract, without re-declaring the
 * route. `auth: false` because the caller is PlentyMarkets, which has no session; the
 * receipt is a trigger and the consumer resyncs (see the handler).
 */
export const plentymarketsHTTPRoutes = defineHTTPRoutes({
  webhook: {
    method: 'post',
    route: '/webhooks/plentymarkets',
    auth: false,
    func: plentymarketsWebhookHandler,
  },
})
