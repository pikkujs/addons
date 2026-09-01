type FormValue = string | number | boolean | null | undefined | FormValue[] | { [key: string]: FormValue }

const append = (params: URLSearchParams, key: string, value: FormValue): void => {
  if (value === null || value === undefined) {
    return
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => append(params, `${key}[${index}]`, entry))
    return
  }
  if (typeof value === 'object') {
    for (const [childKey, childValue] of Object.entries(value)) {
      append(params, `${key}[${childKey}]`, childValue)
    }
    return
  }
  params.append(key, String(value))
}

/**
 * Serialises a request body into the bracket syntax the Stripe v1 API expects
 * (`metadata[stageId]=abc`, `line_items[0][price]=price_123`). The v1 API takes
 * form encoding, not JSON — only the v2 core API takes JSON.
 */
export const formEncode = (body: Record<string, FormValue>): string => {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(body)) {
    append(params, key, value)
  }
  return params.toString()
}

export type { FormValue }
