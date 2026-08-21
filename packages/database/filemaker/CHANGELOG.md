# @pikku/addon-filemaker

## 0.0.6

### Patch Changes

- cb62952: Resolve `#pikku/*` in the published package, not in the source tree

  `imports` pointed at `./.pikku/*/index.ts`, which `files: ["dist"]` never ships
  and Node could not load if it did. Every addon published since the addon-leaf
  migration threw `Cannot find module '.../.pikku/addon/function/index.ts'` on
  first import, out of a file the consuming app never wrote. `imports` now names
  the built tree and tsconfig `paths` keeps resolving the source, which is the
  split `pikku new addon` scaffolds.

  The `.pikku` export targets gain the `addon` segment that codegen has written
  since the leaf split; the subpaths consumers write are unchanged.

- a9b146b: Regenerate against @pikku/cli 0.12.111, and raise the @pikku/core floor to the
  version the output was built against

  `WiredSingletonServices` is no longer exported from the generated function leaf.
  The auth and middleware leaves now derive the intersection themselves from
  `RequiredSingletonServices`, because nothing outside a generated leaf ever names
  it — so every addon's `.pikku/addon/**` changes shape and has to be rebuilt
  rather than merely republished.

  The peer floor moves from `^0.12.86` to `^0.12.89` to name the core the output
  was actually generated and typechecked against. Nothing in the new output
  requires it — the leaves reference each other, not core — but a floor that
  records the tested pairing is the point of having one.

## 0.0.5

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

## 0.0.4

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

## 0.0.3

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.0.2

### Patch Changes

- 99d7625: New OpenAPI-generated addons covering 140 integrations across AI, automation,
  cloud, communication, CRM, data, database, devops, documents, ecommerce, email,
  infrastructure, media, monitoring and payments. Each ships typed pikku functions,
  a credential schema and catalogue metadata (display name, categories, icon).
