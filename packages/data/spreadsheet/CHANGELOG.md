# @pikku/addon-spreadsheet

## 0.1.6

### Patch Changes

- 2c2a4fd: Move every addon onto the split addon leaf, and off the removed `@pikku/core` root barrel.

  `@pikku/core` 0.12.85 / `@pikku/cli` 0.12.106 split the addon leaf so an
  application cannot shadow a linked addon's own (changeset 7722ceb). The CLI now
  writes per-area barrels — nested under `.pikku/addon/` for an addon, flat under
  `.pikku/` for an app — so the authoring half is reached as `#pikku/addon/setup`
  and a function helper as `#pikku/addon/function`. Every addon here still
  imported a bare `#pikku` mapped onto a single `pikku-types.gen.ts` that is no
  longer written, so codegen failed with PKU724.

  The same release retired the package root of `@pikku/core`: `exports['.']` now
  resolves to a six-name bootstrap shim, and `CoreConfig`, `CoreServices`,
  `CoreSingletonServices` and `CoreUserSession` live on `@pikku/core/types`. Every
  `types/application-types.d.ts` imported them from the root, and because each
  addon sets `skipLibCheck` the dead import was silent: `SingletonServices` simply
  lost its `CoreSingletonServices` base. That is what emptied `allSingletonServices`
  for the addons declaring no services of their own, and what dropped `logger`,
  `secrets` and `variables` off the generated setup types everywhere else.

  Per package:

  - `imports` and tsconfig `paths` map `#pikku/*` onto the barrel index
  - `#pikku` imports move to the barrel that owns each name
  - deep generated specifiers take the `addon/` prefix
  - `forceRequiredServices` names the addon's own singletons, since an addon's
    functions are wired by the consuming app and the inspector's `usedFunctions`
    is empty at addon build time
  - `wireAddon`/`wireRemoteAddon` move off `@pikku/core/rpc` onto `@pikku/core/addon`

  Three addons carried a latent bug that the restored types exposed: `redis` and
  `qdrant` called `.reveal()` on a secret their own schema declares optional, and
  `plentymarkets` reached into the leaf by relative path.

## 0.1.5

### Patch Changes

- 31b0085: Resolve every entry point under `dist`

  `imports["#pikku"]` named `./.pikku/pikku-types.gen.ts` — a TypeScript file, at
  runtime, inside `node_modules` — and `files` published a second copy of
  `.pikku` at the package root whose generated output imported a `../src/` and
  `../types/` the tarball did not contain. The `pikku-bootstrap.gen.js` consumers
  import through the `./.pikku/*` subpath only ever existed under `dist`.
  Everything resolved through the workspace link and none of it resolved on
  install.

  Every entry point now points at the built copy, and `files` is just
  `["dist"]`. The addon's own build resolves `#pikku` through tsconfig
  `paths`, so nothing has to reach into the source tree. Consumer import
  specifiers are unchanged.

- f74a5d6: Ship `types/application-types.d.ts` in the published package.

  The build copied `.pikku` into `dist` but left `types` behind, and TypeScript
  never emits a hand-written `.d.ts` to outDir — so `dist/types` did not exist.
  Every generated file under `dist/.pikku` imports `SingletonServices`, `Services`,
  `Config` and `UserSession` from `../../types/application-types.d.js`, which left
  consumers typechecking against a module that was not there: 14 errors inside
  `node_modules` for an app that merely depends on the addon.

## 0.1.4

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.1.3

### Patch Changes

- d09095e: Ship complete catalogue metadata: add the missing icon SVGs the configs already referenced, add icon keys where absent, and move flyio/resend's legacy `node:` meta block to `addon:` so displayName/description/categories/icon actually bake into the published addon meta

## 0.1.2

### Patch Changes

- caa0266: Fix `#pikku` internal package alias to resolve to compiled JS in `dist/.pikku/` instead of the TypeScript source in `.pikku/`. Previously, the `imports` field pointed to `./.pikku/pikku-types.gen.ts`, causing `ERR_MODULE_NOT_FOUND` at runtime in plain Node.js (without tsx) because the re-exported `.gen.js` files only exist in `dist/.pikku/` after compilation.

## 0.1.1

### Patch Changes

- 092e991: Fix .pikku exports to resolve from dist/.pikku instead of root .pikku, preventing module-not-found errors in consumers
- 7a5d17a: Rename `node` config key to `addon` in pikku.config.json

## 0.1.0

Initial release.
