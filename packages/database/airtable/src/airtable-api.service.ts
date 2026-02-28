const BASE_URL = 'https://api.airtable.com/v0'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class AirtableService {
  constructor(private apiKey: string) {}

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(endpoint, BASE_URL)

    if (options?.qs) {
      for (const [key, value] of Object.entries(options.qs)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Airtable API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  async listRecords(baseId: string, tableId: string, options?: {
    pageSize?: number
    offset?: string
    filterByFormula?: string
    sort?: Array<{ field: string; direction?: 'asc' | 'desc' }>
  }) {
    const qs: Record<string, string | number | undefined> = {
      pageSize: options?.pageSize,
      offset: options?.offset,
      filterByFormula: options?.filterByFormula,
    }
    if (options?.sort) {
      options.sort.forEach((s, i) => {
        qs[`sort[${i}][field]`] = s.field
        if (s.direction) {
          qs[`sort[${i}][direction]`] = s.direction
        }
      })
    }
    return this.request<{ records: unknown[]; offset?: string }>(
      'GET',
      `/${baseId}/${tableId}`,
      { qs }
    )
  }

  async getRecord(baseId: string, tableId: string, recordId: string) {
    return this.request<{ id: string; fields: Record<string, unknown> }>(
      'GET',
      `/${baseId}/${tableId}/${recordId}`
    )
  }

  async createRecord(baseId: string, tableId: string, fields: Record<string, unknown>) {
    return this.request<{ id: string; fields: Record<string, unknown> }>(
      'POST',
      `/${baseId}/${tableId}`,
      { body: { fields } }
    )
  }

  async createRecords(baseId: string, tableId: string, records: Array<{ fields: Record<string, unknown> }>) {
    return this.request<{ records: Array<{ id: string; fields: Record<string, unknown> }> }>(
      'POST',
      `/${baseId}/${tableId}`,
      { body: { records } }
    )
  }

  async updateRecord(baseId: string, tableId: string, recordId: string, fields: Record<string, unknown>) {
    return this.request<{ id: string; fields: Record<string, unknown> }>(
      'PATCH',
      `/${baseId}/${tableId}/${recordId}`,
      { body: { fields } }
    )
  }

  async updateRecords(baseId: string, tableId: string, records: Array<{ id: string; fields: Record<string, unknown> }>) {
    return this.request<{ records: Array<{ id: string; fields: Record<string, unknown> }> }>(
      'PATCH',
      `/${baseId}/${tableId}`,
      { body: { records } }
    )
  }

  async deleteRecord(baseId: string, tableId: string, recordId: string) {
    return this.request<{ id: string; deleted: boolean }>(
      'DELETE',
      `/${baseId}/${tableId}/${recordId}`
    )
  }

  async deleteRecords(baseId: string, tableId: string, recordIds: string[]) {
    const qs: Record<string, string> = {}
    recordIds.forEach((id, i) => {
      qs[`records[${i}]`] = id
    })
    return this.request<{ records: Array<{ id: string; deleted: boolean }> }>(
      'DELETE',
      `/${baseId}/${tableId}`,
      { qs }
    )
  }
}
