---
"@pikku/addon-dropbox": patch
"@pikku/addon-g-suite-admin": patch
"@pikku/addon-github": patch
"@pikku/addon-google-big-query": patch
"@pikku/addon-google-books": patch
"@pikku/addon-google-calendar": patch
"@pikku/addon-google-cloud-natural-language": patch
"@pikku/addon-google-contacts": patch
"@pikku/addon-google-docs": patch
"@pikku/addon-google-drive": patch
"@pikku/addon-google-firebase-cloud-firestore": patch
"@pikku/addon-google-sheets": patch
"@pikku/addon-google-slides": patch
"@pikku/addon-google-tasks": patch
"@pikku/addon-harvest": patch
"@pikku/addon-keap": patch
"@pikku/addon-linkedin": patch
"@pikku/addon-microsoft-excel": patch
"@pikku/addon-microsoft-one-drive": patch
"@pikku/addon-microsoft-outlook": patch
"@pikku/addon-microsoft-teams": patch
"@pikku/addon-microsoft-to-do": patch
"@pikku/addon-quickbooks": patch
"@pikku/addon-raindrop": patch
"@pikku/addon-reddit": patch
"@pikku/addon-salesforce": patch
"@pikku/addon-slack": patch
"@pikku/addon-spotify": patch
"@pikku/addon-strava": patch
"@pikku/addon-twist": patch
"@pikku/addon-twitter": patch
"@pikku/addon-youtube": patch
"@pikku/addon-zoom": patch
---

Make the OAuth app secret optional on the 33 addons that declare one.

Each of these addons declares `defineCredential({ type: 'wire', oauth2: { appCredentialSecretId: '<X>_OAUTH_APP', ... } })` — a wire credential, so a host can hand the token straight to the wire with `setCredential` and never touch the OAuth grant. The app secret gates only that grant. Declaring it required means any deploy using the addon must set a client id and client secret for an authorization flow it does not run: with `@pikku/addon-github` wired and the token supplied on the wire, `pikku fabric deploy apply` still stops on a missing `GITHUB_OAUTH_APP`.

`optional` says absence is a supported state and `getSecret` resolves `undefined` — it does not weaken the grant path, which still fails on a missing app credential at the point it needs one.

Two signs this was a scaffold default rather than a decision: `<X>_OAUTH_TOKENS`, the other half of the same `oauth2` block, is already not declared as a required secret; and 21 of the 33 still carry the placeholder `https://example.com/oauth2/authorize` and `.../token` URLs, so the flow the secret gates cannot run at all yet.

Unchanged: addons whose secret is the only way to authenticate. This touches only the OAuth app secret named by an `appCredentialSecretId`.
