# @pikku/addon-wikipedia

## 0.2.0

### Minor Changes

- 99d7625: New `@pikku/addon-wikipedia` addon — search Wikipedia and fetch article content
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

### Patch Changes

- 99d7625: New OpenAPI-generated addons covering 140 integrations across AI, automation,
  cloud, communication, CRM, data, database, devops, documents, ecommerce, email,
  infrastructure, media, monitoring and payments. Each ships typed pikku functions,
  a credential schema and catalogue metadata (display name, categories, icon).
