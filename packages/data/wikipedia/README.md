# @pikku/addon-wikipedia

Search Wikipedia and fetch article summaries and full plain-text content via the
public [Wikimedia APIs](https://api.wikimedia.org/wiki/Core_REST_API). No API key
is required — the addon sends a contactable `User-Agent` as Wikimedia's policy
asks, and reads are anonymous.

## Functions

| RPC                  | Description                                                        |
| -------------------- | ----------------------------------------------------------------- |
| `wikipedia:search`   | Search Wikipedia, returning titles with plain-text snippets.      |
| `wikipedia:summary`  | Fetch the short summary (extract) of an article by exact title.   |
| `wikipedia:getPage`  | Fetch the full plain-text content of an article by exact title.   |

Every function accepts an optional `language` (Wikipedia language edition, e.g.
`"en"`, `"de"`, `"fr"`; defaults to `"en"`).

## Usage

```ts
import { wireAddon } from '#pikku'

wireAddon({ name: 'wikipedia', package: '@pikku/addon-wikipedia' })
```

## Notes

- Backed by the MediaWiki Action API (search, full extracts) and the Wikimedia
  REST v1 API (summaries). A richer surface (page CRUD, transforms, related
  pages) is available from the Wikimedia Core REST API, which publishes an
  OpenAPI spec — a future version can generate against it if needed.
