# @pikku/addon-math

## 0.2.1

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.2.0

### Minor Changes

- 99d7625: New `@pikku/addon-math` addon — evaluate mathematical expressions, take symbolic
  derivatives, and simplify algebraically, powered by [mathjs](https://mathjs.org).
  No external services.

  - `math:evaluate` — evaluate an expression covering arithmetic, trigonometry,
    units, and functions, with an optional named-variable `scope`.
  - `math:derivative` — take the symbolic derivative of an expression w.r.t. a
    variable.
  - `math:simplify` — algebraically simplify an expression.

  `math:evaluate` is the runnable target for n8n's LangChain Calculator tool.
