---
'@pikku/addon-dropbox': patch
'@pikku/addon-g-suite-admin': patch
'@pikku/addon-github': patch
'@pikku/addon-gmail': patch
'@pikku/addon-google-analytics': patch
'@pikku/addon-google-big-query': patch
'@pikku/addon-google-books': patch
'@pikku/addon-google-calendar': patch
'@pikku/addon-google-cloud-natural-language': patch
'@pikku/addon-google-cloud-storage': patch
'@pikku/addon-google-contacts': patch
'@pikku/addon-google-docs': patch
'@pikku/addon-google-drive': patch
'@pikku/addon-google-firebase-cloud-firestore': patch
'@pikku/addon-google-sheets': patch
'@pikku/addon-google-slides': patch
'@pikku/addon-google-tasks': patch
'@pikku/addon-harvest': patch
'@pikku/addon-keap': patch
'@pikku/addon-linkedin': patch
'@pikku/addon-microsoft-excel': patch
'@pikku/addon-microsoft-one-drive': patch
'@pikku/addon-microsoft-outlook': patch
'@pikku/addon-microsoft-teams': patch
'@pikku/addon-microsoft-to-do': patch
'@pikku/addon-quickbooks': patch
'@pikku/addon-raindrop': patch
'@pikku/addon-reddit': patch
'@pikku/addon-salesforce': patch
'@pikku/addon-slack': patch
'@pikku/addon-spotify': patch
'@pikku/addon-strava': patch
'@pikku/addon-twist': patch
'@pikku/addon-twitter': patch
'@pikku/addon-youtube': patch
'@pikku/addon-zoom': patch
---

An OAuth2 credential no longer restates its app secret

Every one of these declared a `defineSecret` holding `{ clientId, clientSecret }` for the id its credential already named in `oauth2.appCredentialSecretId`, byte-identical each time — and `gmail`, `google-analytics` and `google-cloud-storage` never declared one at all, so a deployment was never asked for the app credentials their connect flow needs.

`@pikku/core` now derives that secret from the credential, typed as `OAuth2AppCredential`, which is the shape the runtime has always read it as. The declarations are deleted; the secret is still there.

The three Google credentials also drop the `OAuth2` suffix from their display name, so the console's connect list reads `Gmail` rather than `Gmail OAuth2`.

This needs a `@pikku/core` that derives OAuth2 app secrets.
