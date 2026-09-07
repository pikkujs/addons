---
'@pikku/addon-gmail': patch
---

Resolve the Gmail credential through the wire, so one addon serves both a team
mailbox and a per-user connection.

`GmailService` was built once in `createSingletonServices` from the deployment's
credential service. That service has no user, so `gmailOAuth` could only ever be
a single deployment-wide account: a product where each user connects their own
Gmail read the platform's token, or none at all. It is now built per wire from
`wire.getCredential`, which knows whose request it is.

`defineCredential` still declares `singleton`, and a deployment that wants one
team mailbox needs to change nothing. A deployment that wants per-user
connections says so at the wiring:

```ts
wireAddon({
  name: 'gmail',
  package: '@pikku/addon-gmail',
  credentialOverrides: { gmailOAuth: { mode: 'wire' } },
})
```

This needs a `@pikku/core` that resolves a credential by its declared mode
rather than by whether a per-user lookup came back empty. On an older core a
singleton credential is never loaded for a wire with no user, and every Gmail
call fails as unauthorized.

The `onMessage` trigger is unchanged and still runs against whatever single
account the deployment holds — a trigger fires with no user, so per-user polling
needs the trigger to be able to name one.
