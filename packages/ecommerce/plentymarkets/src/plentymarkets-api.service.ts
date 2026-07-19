import type { PlentymarketsSecrets } from './plentymarkets.secret.js'
import type {
  PlentyOrder,
  PlentyItem,
  PlentyVariation,
  PlentyVariationSyncData,
  PlentyAvailability,
  PlentyCategory,
  PlentyStockEntry,
  PlentyWarehouse,
  PlentyPayment,
  PlentyContact,
} from './schemas.js'

const SUPPORTED_CURRENCIES = ['eur', 'usd', 'gbp'] as const
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]
// PlentyMarkets uses "-1" in a sales price's currency list to mean "every supported
// currency" rather than enumerating them.
const ALL_CURRENCIES_SENTINEL = '-1'

const normalizeCurrency = (value: unknown): SupportedCurrency | null => {
  if (value === undefined || value === null || value === '') return null
  const currency = String(value).toLowerCase()
  return (SUPPORTED_CURRENCIES as readonly string[]).includes(currency)
    ? (currency as SupportedCurrency)
    : null
}

interface PaginatedResponse<T> {
  page: number
  totalsCount: number
  isLastPage: boolean
  lastPageNumber: number
  firstOnPage: number
  lastOnPage: number
  itemsPerPage: number
  entries: T[]
}

export class PlentymarketsService {
  private baseUrl: string
  private headers: Record<string, string>
  private waitUntil: number = 0

  constructor(secrets: PlentymarketsSecrets) {
    this.baseUrl = `${secrets.baseUrl.replace(/\/$/, '')}/rest`
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secrets.accessToken}`,
    }
    if (secrets.apiVersion) {
      this.headers['Accept'] =
        `application/x.plentymarkets.${secrets.apiVersion}+json`
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    queryParams?: Record<
      string,
      string | number | boolean | Array<string | number> | undefined
    >
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value === undefined) continue
        // Array values become repeated params (`with[]=a&with[]=b`), which is how
        // PlentyMarkets expects `with` relations to be requested.
        if (Array.isArray(value)) {
          for (const entry of value) url.searchParams.append(key, String(entry))
        } else {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const now = Date.now()
    if (this.waitUntil > now) {
      await new Promise((resolve) => setTimeout(resolve, this.waitUntil - now))
    }

    let lastError: Error | undefined
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * 2 ** (attempt - 1))
        )
      }

      const response = await fetch(url.toString(), {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
      })

      this.checkThrottle(response)

      if (response.ok || response.status === 204) {
        if (response.status === 204) {
          return undefined as T
        }
        return response.json()
      }

      const error = await response.text()

      if (response.status >= 500) {
        lastError = new Error(
          `PlentyMarkets API error: ${response.status} - ${error}`
        )
        continue
      }

      throw new Error(
        `PlentyMarkets API error: ${response.status} - ${error}`
      )
    }

    throw lastError!
  }

  private checkThrottle(response: Response): void {
    const callsLeft = response.headers.get(
      'X-Plenty-Global-Short-Period-Calls-Left'
    )
    const decay = response.headers.get(
      'X-Plenty-Global-Short-Period-Decay'
    )
    if (!callsLeft || !decay) return
    if (parseInt(callsLeft) > 1) return
    this.waitUntil = Date.now() + parseInt(decay) * 1000
  }

  // Orders
  async listOrders(
    params?: Record<string, string | number | boolean | undefined>
  ) {
    return this.request<PaginatedResponse<PlentyOrder>>(
      'GET',
      '/orders',
      undefined,
      params
    )
  }

  async getOrder(orderId: number, withRelations?: string[]) {
    return this.request<PlentyOrder>(
      'GET',
      `/orders/${orderId}`,
      undefined,
      withRelations && withRelations.length
        ? { 'with[]': withRelations }
        : undefined
    )
  }

  // POST /payments/search filtered to one order — the payment rows a resync sums into
  // an order's paid/credited totals. Separate from listPayments (which has no orderId
  // filter) because a resync needs exactly the payments of one order.
  async searchOrderPayments(orderId: number) {
    return this.request<PaginatedResponse<PlentyPayment>>(
      'POST',
      '/payments/search',
      {
        conditionType: 'and',
        fields: [{ field: 'orderId', operator: 'eq', value: orderId }],
        groups: [],
      }
    )
  }

  async createOrder(body: Record<string, unknown>) {
    return this.request<PlentyOrder>('POST', '/orders', body)
  }

  async updateOrder(orderId: number, body: Record<string, unknown>) {
    return this.request<PlentyOrder>('PUT', `/orders/${orderId}`, body)
  }

  // Items
  async listItems(
    params?: Record<string, string | number | boolean | undefined>
  ) {
    return this.request<PaginatedResponse<PlentyItem>>(
      'GET',
      '/items',
      undefined,
      params
    )
  }

  async getItem(itemId: number) {
    return this.request<PlentyItem>('GET', `/items/${itemId}`)
  }

  async createItem(body: Record<string, unknown>) {
    return this.request<PlentyItem>('POST', '/items', body)
  }

  async updateItem(itemId: number, body: Record<string, unknown>) {
    return this.request<PlentyItem>('PUT', `/items/${itemId}`, body)
  }

  // Variations
  async listVariations(
    itemId: number,
    params?: Record<string, string | number | boolean | undefined>
  ) {
    return this.request<PaginatedResponse<PlentyVariation>>(
      'GET',
      `/items/${itemId}/variations`,
      undefined,
      params
    )
  }

  async getVariation(itemId: number, variationId: number) {
    return this.request<PlentyVariation>(
      'GET',
      `/items/${itemId}/variations/${variationId}`
    )
  }

  // Fetch a variation by its id alone (no itemId), WITH its sales prices — the shape a
  // catalog resync reads currency prices + availability off. PlentyMarkets sometimes
  // returns a paginated envelope for this path, so unwrap `entries[0]` when present.
  async getVariationById(variationId: number) {
    const response = await this.request<
      PlentyVariation | PaginatedResponse<PlentyVariation>
    >('GET', `/items/variations/${variationId}`, undefined, {
      with: ['variationSalesPrices', 'variationSalesPrices.salesPrice'],
    })
    if (response && 'entries' in response && Array.isArray(response.entries)) {
      return response.entries[0]
    }
    return response as PlentyVariation
  }

  async getSalesPrice(salesPriceId: number) {
    return this.request<{
      id?: number
      currencies?: Array<string | { currency?: string }>
    }>('GET', `/items/sales_prices/${salesPriceId}`)
  }

  // Resolve a variation's per-currency gross prices and availability id — the exact
  // data a catalog resync writes. The currency of a sales-price row is either explicit
  // on the row / its nested salesPrice, or discovered by looking the salesPriceId up
  // against /items/sales_prices/{id} (cached across rows). A price list containing the
  // "-1" sentinel means the price applies to every supported currency. First price
  // seen per currency wins, matching the legacy Plentymarkets::Variation extraction.
  async getVariationSyncData(
    variationId: number
  ): Promise<PlentyVariationSyncData> {
    const variation = await this.getVariationById(variationId)
    const rows = variation?.variationSalesPrices ?? []
    const salesPriceCurrencyCache = new Map<number, SupportedCurrency[]>()
    const prices: Record<SupportedCurrency, number | null> = {
      eur: null,
      usd: null,
      gbp: null,
    }

    for (const row of rows) {
      const amount = row?.price
      if (amount === undefined || amount === null) continue

      let currencies: SupportedCurrency[]
      const explicit = normalizeCurrency(row.salesPrice?.currency ?? row.currency)
      if (explicit) {
        currencies = [explicit]
      } else {
        const salesPriceId = row.salesPriceId ?? row.salesPrice?.id
        if (salesPriceId === undefined || salesPriceId === null) {
          currencies = []
        } else {
          let cached = salesPriceCurrencyCache.get(salesPriceId)
          if (!cached) {
            cached = await this.fetchSalesPriceCurrencies(salesPriceId)
            salesPriceCurrencyCache.set(salesPriceId, cached)
          }
          currencies = cached
        }
      }

      for (const currency of currencies) {
        if (prices[currency] === null) prices[currency] = amount
      }
    }

    return {
      prices,
      availabilityId:
        variation?.availability === undefined ||
        variation?.availability === null
          ? null
          : Number(variation.availability),
    }
  }

  private async fetchSalesPriceCurrencies(
    salesPriceId: number
  ): Promise<SupportedCurrency[]> {
    try {
      const salesPrice = await this.getSalesPrice(salesPriceId)
      const raw = (salesPrice?.currencies ?? []).map((c) =>
        typeof c === 'object' && c !== null ? c.currency : c
      )
      if (raw.includes(ALL_CURRENCIES_SENTINEL)) {
        return [...SUPPORTED_CURRENCIES]
      }
      return raw
        .map((c) => normalizeCurrency(c))
        .filter((c): c is SupportedCurrency => c !== null)
    } catch {
      return []
    }
  }

  // The availability catalog dimension ("ships in N days"). GET /availabilities may
  // return a bare array or a paginated envelope; normalize both to an entry array.
  async listAvailabilities(): Promise<PlentyAvailability[]> {
    const response = await this.request<
      PlentyAvailability[] | PaginatedResponse<PlentyAvailability>
    >('GET', '/availabilities')
    if (Array.isArray(response)) return response
    if (response && 'entries' in response && Array.isArray(response.entries)) {
      return response.entries
    }
    return []
  }

  async createVariation(itemId: number, body: Record<string, unknown>) {
    return this.request<PlentyVariation>(
      'POST',
      `/items/${itemId}/variations`,
      body
    )
  }

  async updateVariation(
    itemId: number,
    variationId: number,
    body: Record<string, unknown>
  ) {
    return this.request<PlentyVariation>(
      'PUT',
      `/items/${itemId}/variations/${variationId}`,
      body
    )
  }

  // Categories
  async listCategories(
    params?: Record<string, string | number | boolean | undefined>
  ) {
    return this.request<PaginatedResponse<PlentyCategory>>(
      'GET',
      '/categories',
      undefined,
      params
    )
  }

  async getCategory(id: number) {
    return this.request<PlentyCategory>('GET', `/categories/${id}`)
  }

  async createCategory(body: Record<string, unknown>) {
    return this.request<PlentyCategory>('POST', '/categories', body)
  }

  async updateCategory(id: number, body: Record<string, unknown>) {
    return this.request<PlentyCategory>('PUT', `/categories/${id}`, body)
  }

  async deleteCategory(id: number) {
    return this.request<void>('DELETE', `/categories/${id}`)
  }

  // Stock
  async listStock(
    params?: Record<string, string | number | boolean | undefined>
  ) {
    return this.request<PaginatedResponse<PlentyStockEntry>>(
      'GET',
      '/stockmanagement/stock',
      undefined,
      params
    )
  }

  async listWarehouseStock(
    warehouseId: number,
    params?: Record<string, string | number | boolean | undefined>
  ) {
    return this.request<PaginatedResponse<PlentyStockEntry>>(
      'GET',
      `/stockmanagement/warehouses/${warehouseId}/stock`,
      undefined,
      params
    )
  }

  async correctStock(warehouseId: number, body: Record<string, unknown>) {
    return this.request<void>(
      'PUT',
      `/stockmanagement/warehouses/${warehouseId}/stock/correction`,
      body
    )
  }

  // Warehouses
  async listWarehouses() {
    return this.request<PlentyWarehouse[]>('GET', '/stockmanagement/warehouses')
  }

  async getWarehouse(id: number) {
    return this.request<PlentyWarehouse>(
      'GET',
      `/stockmanagement/warehouses/${id}`
    )
  }

  // Payments
  async listPayments(
    params?: Record<string, string | number | boolean | undefined>
  ) {
    return this.request<PaginatedResponse<PlentyPayment>>(
      'GET',
      '/payments',
      undefined,
      params
    )
  }

  async getPayment(id: number) {
    return this.request<PlentyPayment>('GET', `/payments/${id}`)
  }

  async createPayment(body: Record<string, unknown>) {
    return this.request<PlentyPayment>('POST', '/payments', body)
  }

  // Contacts
  async listContacts(
    params?: Record<string, string | number | boolean | undefined>
  ) {
    return this.request<PaginatedResponse<PlentyContact>>(
      'GET',
      '/accounts/contacts',
      undefined,
      params
    )
  }

  async getContact(id: number) {
    return this.request<PlentyContact>('GET', `/accounts/contacts/${id}`)
  }

  async createContact(body: Record<string, unknown>) {
    return this.request<PlentyContact>('POST', '/accounts/contacts', body)
  }

  async updateContact(id: number, body: Record<string, unknown>) {
    return this.request<PlentyContact>(
      'PUT',
      `/accounts/contacts/${id}`,
      body
    )
  }
}
