import type { ProductsResponse } from "@/types/product"

const BASE_URL = "https://mock.apidog.com/m1/523540-0-default"

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/api/products`)

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`)
  }

  return await response.json()
}
