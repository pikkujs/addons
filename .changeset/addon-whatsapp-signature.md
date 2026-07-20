---
'@pikku/addon-whatsapp': patch
---

Verify Meta's `X-Hub-Signature-256` on inbound WhatsApp webhook deliveries.

`verifyWebhook` previously handled only the GET `hub.challenge` subscription
handshake — inbound POST message deliveries were parsed with no authentication
at all, so anyone who knew the webhook URL could POST a payload claiming any
`from` number. That is an impersonation vector for any application that derives
identity or authorization from the sender.

Message deliveries are now authenticated with an HMAC-SHA256 of the raw request
body keyed by the Meta app secret, mirroring the existing Slack gateway's
signature check. The check fails closed: no HTTP request access, a missing
header, or a digest mismatch all reject with `UnauthorizedError`. The digest is
computed over the raw bytes rather than the re-serialized payload, since key
order and whitespace would otherwise change it.

The GET subscription handshake stays exempt — Meta does not sign it, and
`hub.verify_token` is its shared secret.

Note that Meta's scheme carries no timestamp, so unlike Slack's it offers no
replay protection; a captured request remains valid until the app secret is
rotated.

**Breaking:** `WhatsAppGatewayAdapter` takes a third constructor argument,
`appSecret`, and `WHATSAPP_CREDENTIALS` gains a required `appSecret` field
(Meta App Dashboard → Settings → Basic). Making it required is deliberate — an
optional secret would let the check silently no-op.
