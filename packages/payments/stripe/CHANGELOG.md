# @pikku/addon-stripe

## 0.1.2

### Patch Changes

- c9339b7: Fix package publishing to use `publishConfig.directory` so `#pikku` imports resolve correctly when consumed from npm.

## 0.1.1

### Patch Changes

- 092e991: Fix .pikku exports to resolve from dist/.pikku instead of root .pikku, preventing module-not-found errors in consumers
- 7a5d17a: Rename `node` config key to `addon` in pikku.config.json

## 0.1.0

Initial release.
