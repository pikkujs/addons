#!/usr/bin/env node
/**
 * Codemod: bump every external @pikku/* dependency across the monorepo to the
 * latest version published on npm.
 *
 * Workspace-internal ranges (workspace:*, file:.., link:..) are left alone.
 *
 * Usage:
 *   node scripts/update-pikku-versions.mjs [options]
 *
 *   --dry            Show what would change, write nothing
 *   --tag <tag>      npm dist-tag to resolve (default: latest)
 *   --only <a,b>     Only bump these packages (names with or without @pikku/)
 *   --set <pkg@ver>  Use this range verbatim instead of querying npm (repeatable).
 *                    `--set @pikku/core@0.12.84` pins exactly;
 *                    `--set @pikku/core@^0.12.84` writes a caret range.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { relative, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const args = process.argv.slice(2)
const flag = (name) => args.includes(name)
const value = (name) => {
  const i = args.indexOf(name)
  return i === -1 ? undefined : args[i + 1]
}
const multi = (name) =>
  args.flatMap((a, i) => (a === name && args[i + 1] ? [args[i + 1]] : []))

const DRY = flag('--dry')
const TAG = value('--tag') ?? 'latest'
const ONLY = (value('--only')?.split(',') ?? [])
  .map((n) => n.trim())
  .filter(Boolean)
  .map((n) => (n.startsWith('@pikku/') ? n : `@pikku/${n}`))

const PINNED = new Map(
  multi('--set').map((s) => {
    const at = s.lastIndexOf('@')
    return [s.slice(0, at), s.slice(at + 1)]
  })
)

const DEP_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]
const LOCAL_PROTOCOLS = /^(workspace|file|link|portal):/

const packageFiles = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '*package.json'],
  { cwd: ROOT, encoding: 'utf8' }
)
  .split('\n')
  .filter(Boolean)
  .filter((f) => !f.includes('node_modules/'))

// --- Collect every external @pikku/* dep name in use --------------------------
const manifests = packageFiles.map((file) => ({
  file,
  raw: readFileSync(resolve(ROOT, file), 'utf8'),
}))

const wanted = new Set()
for (const { raw } of manifests) {
  const json = JSON.parse(raw)
  for (const field of DEP_FIELDS) {
    for (const [name, range] of Object.entries(json[field] ?? {})) {
      if (!name.startsWith('@pikku/')) continue
      if (LOCAL_PROTOCOLS.test(range)) continue
      if (ONLY.length && !ONLY.includes(name)) continue
      wanted.add(name)
    }
  }
}

// --- Resolve target versions --------------------------------------------------
const versions = new Map()
for (const name of [...wanted].sort()) {
  if (PINNED.has(name)) {
    versions.set(name, PINNED.get(name))
    console.log(`${name} -> ${PINNED.get(name)} (pinned)`)
    continue
  }
  const version = execFileSync('npm', ['view', name, `dist-tags.${TAG}`], {
    encoding: 'utf8',
  }).trim()
  if (!version) throw new Error(`No "${TAG}" version published for ${name}`)
  versions.set(name, version)
  console.log(`${name} -> ${version}`)
}

// --- Rewrite ------------------------------------------------------------------
let changedFiles = 0
let changedDeps = 0

for (const { file, raw } of manifests) {
  let next = raw
  const json = JSON.parse(raw)
  const edits = []

  for (const field of DEP_FIELDS) {
    for (const [name, range] of Object.entries(json[field] ?? {})) {
      const target = versions.get(name)
      if (!target || LOCAL_PROTOCOLS.test(range)) continue
      // A --set value is used verbatim (so `--set @pikku/core@0.12.84` pins
      // exactly); resolved versions keep the manifest's existing range prefix.
      const wantedRange = PINNED.has(name)
        ? target
        : `${range.match(/^[\^~]?/)[0]}${target}`
      if (range === wantedRange) continue
      edits.push([name, range, wantedRange])
    }
  }

  // The same dep can appear in several fields with the same range; the regex
  // replace below is global, so collapse duplicates first.
  const uniqueEdits = [
    ...new Map(edits.map((e) => [`${e[0]}\u0000${e[1]}`, e])).values(),
  ]

  if (!uniqueEdits.length) continue

  for (const [name, from, to] of uniqueEdits) {
    // Replace only the "name": "range" pair, leaving formatting untouched
    const pattern = new RegExp(
      `("${name.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&')}"\\s*:\\s*")${from.replace(
        /[\^$*+?.()|[\]{}]/g,
        '\\$&'
      )}(")`,
      'g'
    )
    const replaced = next.replace(pattern, `$1${to}$2`)
    if (replaced === next) {
      throw new Error(`Failed to rewrite ${name} in ${file}`)
    }
    next = replaced
    changedDeps++
  }

  changedFiles++
  if (!DRY) writeFileSync(resolve(ROOT, file), next)
  console.log(
    `${DRY ? '[dry] ' : ''}${relative('.', file)}: ${uniqueEdits
      .map(([n, f, t]) => `${n} ${f} -> ${t}`)
      .join(', ')}`
  )
}

console.log(
  `\n${DRY ? 'Would update' : 'Updated'} ${changedDeps} dependencies across ${changedFiles} package.json files.`
)
if (!DRY && changedFiles) console.log('Next: yarn install')
