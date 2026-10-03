---
'@pikku/addon-resend': patch
---

Ship `pikku-db-meta.gen.json`

0.0.8 was built before addons published their table metadata, and `pikku db generate` refuses an addon that does not publish it. The build already copies the file into `dist/.pikku/addon/db/`; this release puts it in the package.
