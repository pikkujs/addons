---
'@pikku/addon-wikipedia': minor
---

New `@pikku/addon-wikipedia` addon — search Wikipedia and fetch article content
via the public Wikimedia APIs. Dependency-free (built on `fetch`), no API key
required (sends a contactable `User-Agent` per Wikimedia policy).

- `wikipedia:search` — search Wikipedia, returning titles with plain-text
  snippets (via the MediaWiki Action API).
- `wikipedia:summary` — fetch an article's short summary/extract, description,
  URL, and thumbnail by exact title (via the Wikimedia REST v1 API).
- `wikipedia:getPage` — fetch an article's full plain-text content by exact
  title.

Every function accepts an optional `language` (Wikipedia language edition,
default `en`). Serves as the runnable target for n8n's LangChain Wikipedia tool.
