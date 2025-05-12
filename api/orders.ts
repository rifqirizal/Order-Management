import type { OrdersResponse, Order, OrderRequest, ApiResponse } from "@/types/order"

const BASE_URL = "https://mock.apidog.com/m1/523540-0-default"

export interface OrdersQueryParams {
  page?: number
  limit?: number
  customer_name?: string
  order_date?: string
}

export async function getOrders(params: OrdersQueryParams = {}): Promise<OrdersResponse> {
  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString())
    }
  })

  const response = await fetch(`${BASE_URL}/api/orders?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`)
  }

  return await response.json()
}

export async function getOrderById(orderId: string): Promise<Order> {
  const response = await fetch(`${BASE_URL}/api/order/${orderId}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.status}`)
  }

  return await response.json()
}

export async function createOrder(orderData: OrderRequest): Promise<ApiResponse> {
  const response = await fetch(`${BASE_URL}/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.status}`)
  }

  return await response.json()
}

export async function updateOrder(orderId: string, orderData: OrderRequest): Promise<ApiResponse> {
  const response = await fetch(`${BASE_URL}/api/order/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    throw new Error(`Failed to update order: ${response.status}`)
  }

  return await response.json()
}

export async function deleteOrder(orderId: string): Promise<ApiResponse> {
  const response = await fetch(`${BASE_URL}/api/order/${orderId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Failed to delete order: ${response.status}`)
  }

  return await response.json()
}
