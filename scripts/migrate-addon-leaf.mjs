#!/usr/bin/env node
/**
 * Codemod: migrate every addon package to the split addon leaf introduced by
 * @pikku/core 0.12.85 / @pikku/cli 0.12.106 (changeset 7722ceb).
 *
 * Before, an addon authored itself through a bare `#pikku` that mapped to a
 * single generated `pikku-types.gen.ts`. The CLI now writes per-area barrels,
 * nested under `.pikku/addon/` for an addon and flat under `.pikku/` for an
 * app, so the authoring half is reached as `#pikku/addon/setup` and friends.
 *
 * Per addon package this rewrites:
 *   1. package.json  "imports"            -> the barrel-index map
 *   2. tsconfig.json "paths"              -> the same, for tsc
 *   3. src/**.ts     `from '#pikku'`      -> the per-symbol barrel specifier
 *   4. pikku.config.json                  -> forceRequiredServices, because an
 *      addon's functions are wired by the consuming app, so the inspector's
 *      `usedFunctions` is empty and every service would land optional
 * and in each test harness:
 *   5. `wireAddon`/`wireRemoteAddon`      -> @pikku/core/addon (off /rpc)
 *
 * It also moves imports off the `@pikku/core` root. That barrel is gone as of
 * 0.12.85 — the root now resolves to a six-name bootstrap shim — and because
 * every addon sets `skipLibCheck`, the dead import in `application-types.d.ts`
 * was silent: `SingletonServices` simply lost its `CoreSingletonServices` base,
 * which is what emptied `allSingletonServices` (PKU724) and dropped `logger`,
 * `secrets` and `variables` off the generated setup types.
 *
 * Usage: node scripts/migrate-addon-leaf.mjs [--dry] [--only <pkg,pkg>]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const DRY = args.includes('--dry')
const ONLY = (() => {
  const i = args.indexOf('--only')
  return i === -1 ? [] : (args[i + 1] ?? '').split(',').filter(Boolean)
})()

/** Which barrel each symbol authored through `#pikku` now lives in. */
const BARRELS = {
  setup: [
    'pikkuConfig',
    'pikkuServices',
    'pikkuWireServices',
    'pikkuAddonConfig',
    'pikkuAddonServices',
    'pikkuAddonWireServices',
  ],
  trigger: ['pikkuTriggerFunc', 'wireTrigger', 'wireTriggerSource'],
  // `wireAddon`/`wireRemoteAddon` are the install half and stay on the leaf root
  '': ['wireAddon', 'wireRemoteAddon'],
}
const SYMBOL_BARREL = new Map()
for (const [barrel, names] of Object.entries(BARRELS)) {
  for (const name of names) SYMBOL_BARREL.set(name, barrel)
}
/** Everything else authored through `#pikku` is a function-defining helper. */
const DEFAULT_BARREL = 'function'

/** Where each name the root barrel used to carry now lives. */
const CORE_SUBPATH = {
  CoreConfig: '@pikku/core/types',
  CoreServices: '@pikku/core/types',
  CoreSingletonServices: '@pikku/core/types',
  CoreUserSession: '@pikku/core/types',
  CreateSingletonServices: '@pikku/core/types',
  stopSingletonServices: '@pikku/core/utils',
  EmailService: '@pikku/core/services',
  SendEmailInput: '@pikku/core/services',
  SendEmailResult: '@pikku/core/services',
  AIEmbeddingService: '@pikku/core/services',
  ContentService: '@pikku/core/services',
}

const IMPORTS_MAP = {
  '#pikku/*.gen.js': './.pikku/*.gen.ts',
  '#pikku/*': './.pikku/*/index.ts',
}

/**
 * A deep specifier names a generated file rather than a barrel, so it takes the
 * `addon/` leaf prefix the same way — `#pikku/variables/pikku-variables.gen.js`
 * becomes `#pikku/addon/variables/pikku-variables.gen.js`.
 */
const prefixGenSpecifiers = (source, prefix) =>
  prefix === '#pikku'
    ? source
    : source.replace(
        /'#pikku\/((?!addon\/)[\w./-]+\.gen\.js)'/g,
        `'${prefix}/$1'`
      )

const read = (p) => readFileSync(p, 'utf8')
const readJson = (p) => JSON.parse(read(p))
const write = (p, s) => {
  if (!DRY) writeFileSync(p, s)
}
const writeJson = (p, o) => write(p, `${JSON.stringify(o, null, 2)}\n`)

const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '*pikku.config.json'],
  { cwd: ROOT, encoding: 'utf8' }
)
  .split('\n')
  .filter(Boolean)
  .filter((f) => !f.includes('node_modules/'))

const addonDirs = []
const testDirs = []
for (const file of files) {
  const dir = join(ROOT, dirname(file))
  const config = readJson(join(ROOT, file))
  if (config.addon) addonDirs.push(dir)
  else testDirs.push(dir)
}

/** Source files of a package, generated output excluded. */
const sourceFiles = (dir) =>
  execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '*.ts'], {
    cwd: dir,
    encoding: 'utf8',
  })
    .split('\n')
    .filter(Boolean)
    .filter((f) => !f.startsWith('.pikku/') && !f.includes('node_modules/'))
    .map((f) => join(dir, f))

/**
 * Rewrite one `import { … } from '#pikku'` into one import per barrel its
 * symbols belong to, keeping each specifier's `type` modifier and alias.
 */
const rewriteImports = (source, prefix) =>
  source.replace(
    /import\s+(type\s+)?\{([^}]*)\}\s*from\s*'#pikku'/g,
    (whole, typeModifier, specifiers) => {
      const byBarrel = new Map()
      for (const raw of specifiers.split(',')) {
        const specifier = raw.trim()
        if (!specifier) continue
        const name = specifier.replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim()
        const barrel = SYMBOL_BARREL.get(name) ?? DEFAULT_BARREL
        if (!byBarrel.has(barrel)) byBarrel.set(barrel, [])
        byBarrel.get(barrel).push(specifier)
      }
      if (!byBarrel.size) return whole
      return [...byBarrel]
        .map(([barrel, names]) => {
          const path = barrel ? `${prefix}/${barrel}` : prefix
          return `import ${typeModifier ?? ''}{ ${names.join(', ')} } from '${path}'`
        })
        .join('\n')
    }
  )

/** The services the addon declares, which the consuming app must provide. */
/**
 * Split an `import … from '@pikku/core'` across the subpaths that now own each
 * name. Anything unrecognised is left on the root so it fails loudly.
 */
const rewriteCoreImports = (source) =>
  source.replace(
    /import\s+(type\s+)?\{([^}]*)\}\s*from\s*'@pikku\/core'/g,
    (whole, typeModifier, specifiers) => {
      const bySubpath = new Map()
      for (const raw of specifiers.split(',')) {
        const specifier = raw.trim()
        if (!specifier) continue
        const name = specifier.replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim()
        const subpath = CORE_SUBPATH[name]
        if (!subpath) return whole
        if (!bySubpath.has(subpath)) bySubpath.set(subpath, [])
        bySubpath.get(subpath).push(specifier)
      }
      if (!bySubpath.size) return whole
      return [...bySubpath]
        .map(
          ([subpath, names]) =>
            `import ${typeModifier ?? ''}{ ${names.join(', ')} } from '${subpath}'`
        )
        .join('\n')
    }
  )

const declaredSingletonServices = (dir) => {
  const typesFile = join(dir, 'types/application-types.d.ts')
  if (!existsSync(typesFile)) return []
  const body = read(typesFile).match(
    /interface SingletonServices[^{]*\{([\s\S]*?)\n\}/
  )
  if (!body) return []
  return [...body[1].matchAll(/^ {2}(\w+)\s*[?:]/gm)].map((m) => m[1])
}

let touched = 0

for (const dir of addonDirs) {
  const name = relative(ROOT, dir)
  if (ONLY.length && !ONLY.some((o) => name.includes(o))) continue
  const changes = []

  // 1. package.json imports
  const pkgPath = join(dir, 'package.json')
  const pkg = readJson(pkgPath)
  if (JSON.stringify(pkg.imports) !== JSON.stringify(IMPORTS_MAP)) {
    pkg.imports = IMPORTS_MAP
    writeJson(pkgPath, pkg)
    changes.push('imports')
  }

  // 2. tsconfig paths
  const tsconfigPath = join(dir, 'tsconfig.json')
  if (existsSync(tsconfigPath)) {
    const before = read(tsconfigPath)
    const after = before.replace(
      /"#pikku"\s*:\s*\[[^\]]*\]/,
      '"#pikku/*.gen.js": ["./.pikku/*.gen.ts"],\n      "#pikku/*": ["./.pikku/*/index.ts"]'
    )
    if (after !== before) {
      write(tsconfigPath, after)
      changes.push('tsconfig')
    }
  }

  // 3. source imports
  let rewritten = 0
  for (const file of sourceFiles(dir)) {
    const before = read(file)
    const after = prefixGenSpecifiers(
      rewriteCoreImports(rewriteImports(before, '#pikku/addon')),
      '#pikku/addon'
    )
    if (after !== before) {
      write(file, after)
      rewritten++
    }
  }
  if (rewritten) changes.push(`${rewritten} imports`)

  // 4. forceRequiredServices
  const configPath = join(dir, 'pikku.config.json')
  const config = readJson(configPath)
  const services = declaredSingletonServices(dir)
  if (services.length && !config.forceRequiredServices) {
    config.forceRequiredServices = services
    writeJson(configPath, config)
    changes.push(`force ${services.join('+')}`)
  }

  if (changes.length) {
    touched++
    console.log(`${DRY ? '[dry] ' : ''}${name}: ${changes.join(', ')}`)
  }
}

// 5. Test harnesses: an app keeps a flat leaf, and wireAddon moved off /rpc.
for (const dir of testDirs) {
  const name = relative(ROOT, dir)
  if (ONLY.length && !ONLY.some((o) => name.includes(o))) continue
  let rewritten = 0
  for (const file of sourceFiles(dir)) {
    const before = read(file)
    let after = rewriteCoreImports(rewriteImports(before, '#pikku'))
    after = after.replace(
      /from '@pikku\/core\/rpc'/g,
      (whole) =>
        /wire(Remote)?Addon/.test(before) ? "from '@pikku/core/addon'" : whole
    )
    if (after !== before) {
      write(file, after)
      rewritten++
    }
  }
  if (rewritten) {
    touched++
    console.log(`${DRY ? '[dry] ' : ''}${name}: ${rewritten} imports`)
  }
}

console.log(`\n${DRY ? 'Would touch' : 'Touched'} ${touched} packages.`)
