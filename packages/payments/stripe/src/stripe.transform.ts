// Casing + date normalization for the Stripe SDK boundary. The addon exposes a
// uniform camelCase, ISO-date surface so callers never have to learn Stripe's
// snake_case/epoch-seconds conventions. `metadata` is the one field this never
// touches (keys or values) — it's a free-form user string map that our own
// webhook consumers read back by exact key on the Stripe side, so silently
// rewriting a metadata key here would break that round trip in production.

export const snakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

export const camelCase = (str: string): string =>
  str.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase())

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)

// Recursively converts camelCase object keys to snake_case, for building Stripe
// SDK params from addon input. Never descends into a `metadata` value.
export const toStripeParams = (input: unknown): any => {
  if (Array.isArray(input)) {
    return input.map((item) => toStripeParams(item))
  }
  if (isPlainObject(input)) {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(input)) {
      if (value === undefined) continue
      const snakeKey = snakeCase(key)
      result[snakeKey] = key === 'metadata' ? value : toStripeParams(value)
    }
    return result
  }
  return input
}

// Recursively converts snake_case keys on a raw Stripe SDK object/response to
// camelCase, for building addon output. Never descends into a `metadata` value.
export const fromStripeObject = (output: unknown): any => {
  if (Array.isArray(output)) {
    return output.map((item) => fromStripeObject(item))
  }
  if (isPlainObject(output)) {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(output)) {
      const camelKey = camelCase(key)
      result[camelKey] = key === 'metadata' ? value : fromStripeObject(value)
    }
    return result
  }
  return output
}

// Epoch-seconds → ISO-8601 string. Date fields must always be named explicitly
// at the call site — epoch seconds are indistinguishable from plain integer
// amounts, so there is no safe way to infer "this looks like a timestamp".
export const epochToIso = (seconds: number | null | undefined): string | null =>
  seconds == null ? null : new Date(seconds * 1000).toISOString()
