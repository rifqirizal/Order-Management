"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CircularProgress } from "@mui/material"
import Card from "../atoms/Card"
import Alert from "../atoms/Alert"
import OrderForm from "../organisms/OrderForm"
import { getProducts } from "@/api/products"
import { createOrder } from "@/api/orders"
import type { Product } from "@/types/product"

interface AddOrderSectionProps {
  onCancel: () => void
  onSuccess: () => void
}

const AddOrderSection: React.FC<AddOrderSectionProps> = ({ onCancel, onSuccess }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<any>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await getProducts()
      setProducts(response.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to fetch products. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setSubmitting(true)
    setValidationErrors(null)
    setError(null)

    // Cek apakah semua field kosong
    const isCustomerNameEmpty = !data.customer_name?.trim()
    const isProductsEmpty = !Array.isArray(data.products) || data.products.length === 0
    const isAllProductFieldsEmpty = data.products?.every(
      (item: any) => !item.product_id && !item.quantity
    )

    if (isCustomerNameEmpty && (isProductsEmpty || isAllProductFieldsEmpty)) {
      setValidationErrors("You should fill all of mandatory field.")
      setSubmitting(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    try {
      const payload = {
        customer_name: data.customer_name,
        products: data.products.map((item: any) => ({
          product_id: Number(item.product_id),
          quantity: Number(item.quantity),
        })),
      }

      const response = await createOrder(payload)
      if (response.success) {
        onSuccess()
      } else {
        setError("Failed to create order. Please try again.")
      }
    } catch (err: any) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      console.error("Error creating order:", err)
      setError("Failed to create order. Please try again.")

    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Order</h1>
        <Card>
          <div className="flex justify-center items-center h-64">
            <CircularProgress color="primary" />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="relative mb-10">
        <h1 className="text-2xl font-bold text-center">Add New Ordert</h1>
        {error &&
          <div className="absolute right-0 -translate-y-1/2">
            <Alert severity="error" message={error} className="mb-4" />
          </div>
        }
        {validationErrors && (
          <div className="absolute right-0 -translate-y-1/2">
            <Alert severity="error" message={validationErrors} className="mb-4" />
          </div>
        )}
      </div>
      <Card>
        <OrderForm
          products={products}
          onSubmit={handleSubmit}
          onCancel={onCancel}
          isSubmitting={submitting}
          errors={validationErrors}
          type="add"
        />
      </Card>
    </div>
  )
}

export default AddOrderSection
