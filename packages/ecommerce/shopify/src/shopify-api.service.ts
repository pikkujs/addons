import type { ShopifySecrets } from './shopify.secret.js'
import type {
  ShopifyProduct,
  ShopifyOrder,
  ShopifyCustomer,
  ShopifyInventoryLevel,
  CreateProductInput,
  UpdateProductInput,
  CreateCustomerInput,
  UpdateCustomerInput,
  CreateOrderInput,
  UpdateOrderInput,
  ListProductsParams,
  ListOrdersParams,
  ListCustomersParams,
} from './schemas.js'

export class ShopifyService {
  private baseUrl: string
  private headers: Record<string, string>

  constructor(secrets: ShopifySecrets) {
    this.baseUrl = `https://${secrets.shopDomain}/admin/api/2024-01`
    this.headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': secrets.accessToken,
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Shopify API error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  // Products
  async getProduct(productId: string) {
    return this.request<{ product: ShopifyProduct }>('GET', `/products/${productId}.json`)
  }

  async listProducts(params?: ListProductsParams) {
    const query = new URLSearchParams()
    if (params?.limit) query.set('limit', params.limit.toString())
    if (params?.since_id) query.set('since_id', params.since_id)
    if (params?.collection_id) query.set('collection_id', params.collection_id)
    const qs = query.toString() ? `?${query.toString()}` : ''
    return this.request<{ products: ShopifyProduct[] }>('GET', `/products.json${qs}`)
  }

  async createProduct(product: CreateProductInput) {
    return this.request<{ product: ShopifyProduct }>('POST', '/products.json', { product })
  }

  async updateProduct(productId: string, product: UpdateProductInput) {
    return this.request<{ product: ShopifyProduct }>('PUT', `/products/${productId}.json`, { product })
  }

  async deleteProduct(productId: string) {
    return this.request<void>('DELETE', `/products/${productId}.json`)
  }

  // Orders
  async createOrder(order: CreateOrderInput) {
    return this.request<{ order: ShopifyOrder }>('POST', '/orders.json', { order })
  }

  async getOrder(orderId: string) {
    return this.request<{ order: ShopifyOrder }>('GET', `/orders/${orderId}.json`)
  }

  async listOrders(params?: ListOrdersParams) {
    const query = new URLSearchParams()
    if (params?.limit) query.set('limit', params.limit.toString())
    if (params?.status) query.set('status', params.status)
    if (params?.since_id) query.set('since_id', params.since_id)
    const qs = query.toString() ? `?${query.toString()}` : ''
    return this.request<{ orders: ShopifyOrder[] }>('GET', `/orders.json${qs}`)
  }

  async updateOrder(orderId: string, order: UpdateOrderInput) {
    return this.request<{ order: ShopifyOrder }>('PUT', `/orders/${orderId}.json`, { order })
  }

  async deleteOrder(orderId: string) {
    return this.request<void>('DELETE', `/orders/${orderId}.json`)
  }

  async cancelOrder(orderId: string, reason?: string) {
    return this.request<{ order: ShopifyOrder }>('POST', `/orders/${orderId}/cancel.json`, { reason })
  }

  // Customers
  async getCustomer(customerId: string) {
    return this.request<{ customer: ShopifyCustomer }>('GET', `/customers/${customerId}.json`)
  }

  async listCustomers(params?: ListCustomersParams) {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    if (params?.since_id) queryParams.set('since_id', params.since_id)
    if (params?.query) queryParams.set('query', params.query)
    const qs = queryParams.toString() ? `?${queryParams.toString()}` : ''
    return this.request<{ customers: ShopifyCustomer[] }>('GET', `/customers.json${qs}`)
  }

  async createCustomer(customer: CreateCustomerInput) {
    return this.request<{ customer: ShopifyCustomer }>('POST', '/customers.json', { customer })
  }

  async updateCustomer(customerId: string, customer: UpdateCustomerInput) {
    return this.request<{ customer: ShopifyCustomer }>('PUT', `/customers/${customerId}.json`, { customer })
  }

  async deleteCustomer(customerId: string) {
    return this.request<void>('DELETE', `/customers/${customerId}.json`)
  }

  // Inventory
  async getInventoryLevel(inventoryItemId: string, locationId: string) {
    return this.request<{ inventory_levels: ShopifyInventoryLevel[] }>(
      'GET',
      `/inventory_levels.json?inventory_item_ids=${inventoryItemId}&location_ids=${locationId}`
    )
  }

  async adjustInventory(inventoryItemId: string, locationId: string, adjustment: number) {
    return this.request<{ inventory_level: ShopifyInventoryLevel }>(
      'POST',
      '/inventory_levels/adjust.json',
      {
        location_id: locationId,
        inventory_item_id: inventoryItemId,
        available_adjustment: adjustment,
      }
    )
  }
}
