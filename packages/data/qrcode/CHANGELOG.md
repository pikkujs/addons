# @pikku/addon-qrcode

## 0.1.2

### Patch Changes

- caa0266: Fix `#pikku` internal package alias to resolve to compiled JS in `dist/.pikku/` instead of the TypeScript source in `.pikku/`. Previously, the `imports` field pointed to `./.pikku/pikku-types.gen.ts`, causing `ERR_MODULE_NOT_FOUND` at runtime in plain Node.js (without tsx) because the re-exported `.gen.js` files only exist in `dist/.pikku/` after compilation.

## 0.1.1

### Patch Changes

- 092e991: Fix .pikku exports to resolve from dist/.pikku instead of root .pikku, preventing module-not-found errors in consumers
- 7a5d17a: Rename `node` config key to `addon` in pikku.config.json

## 0.1.0

Initial release.
