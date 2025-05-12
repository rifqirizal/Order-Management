export interface OrderProduct {
  total_price: string,
  price: string,
  name: string,
  id: any
  quantity: number
  product: {
    name: string
    price: number
    id: number
  }
}

export interface Order {
  id?: string
  order_id?: string 
  customer_name: string
  total_products?: number
  total_price?: number
  created_at?: string
  products?: OrderProduct[]
}

export interface OrdersResponse {
  page: number
  limit: number
  total: number
  list: Order[]
}

export interface OrderRequest {
  customer_name: string
  products: {
    product_id: number
    quantity: number
  }[]
}

export interface ApiResponse {
  success: boolean
}
