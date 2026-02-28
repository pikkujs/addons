import type { PlentymarketsSecrets } from './plentymarkets.secret.js'
import type {
  PlentyOrder,
  PlentyItem,
  PlentyVariation,
  PlentyCategory,
  PlentyStockEntry,
  PlentyWarehouse,
  PlentyPayment,
  PlentyContact,
} from './schemas.js'

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
    queryParams?: Record<string, string | number | boolean | undefined>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
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

  async getOrder(orderId: number) {
    return this.request<PlentyOrder>('GET', `/orders/${orderId}`)
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
