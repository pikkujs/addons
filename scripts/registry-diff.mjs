// Reads `name@version` lines on stdin (the local checkout's publishable
// packages) and writes to stdout the subset the registry does not already have
// at that exact version. Used by backfill-registry.sh --reconcile; the summary
// goes to stderr so stdout stays a clean list of specs.
//
// GET /registry/addons is public and paginated — 50 per page by default, with a
// `nextCursor` — so page through it before diffing.

const registryUrl = process.env.REGISTRY_URL ?? 'https://api.pikkufabric.com'

const local = (await new Promise((resolve) => {
  let buf = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (c) => (buf += c))
  process.stdin.on('end', () => resolve(buf))
}))
  .trim()
  .split('\n')
  .filter(Boolean)

// Split a trailing @version off without eating a leading @scope.
const parse = (spec) => {
  const m = spec.match(/^(@?[^@]+)@(.+)$/)
  if (!m) {
    console.error(`Skipping unparseable spec: ${spec}`)
    return null
  }
  return { name: m[1], version: m[2] }
}

const registry = new Map()
let cursor = 0
while (true) {
  const res = await fetch(`${registryUrl}/registry/addons?limit=100&cursor=${cursor}`)
  if (!res.ok) {
    console.error(`Failed to list registry packages: ${res.status} ${res.statusText}`)
    process.exit(1)
  }
  const body = await res.json()
  for (const p of body.packages) registry.set(p.name, p.version)
  if (!body.nextCursor || body.packages.length === 0) break
  cursor = body.nextCursor
}

let missing = 0
let stale = 0
for (const spec of local) {
  const parsed = parse(spec)
  if (!parsed) continue
  const have = registry.get(parsed.name)
  if (have === undefined) {
    missing++
    console.log(spec)
  } else if (have !== parsed.version) {
    stale++
    console.log(spec)
  }
}

console.error(
  `Registry has ${registry.size} package(s); checkout has ${local.length}. ` +
    `Missing: ${missing}, stale: ${stale}.`,
)
