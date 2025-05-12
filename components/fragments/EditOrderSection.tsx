"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CircularProgress } from "@mui/material"
import Card from "../atoms/Card"
import Alert from "../atoms/Alert"
import OrderForm from "../organisms/OrderForm"
import { getProducts } from "@/api/products"
import { updateOrder } from "@/api/orders"
import type { Product } from "@/types/product"
import type { Order } from "@/types/order"
import { useRouter } from "next/navigation"

interface EditOrderSectionProps {
  order: Order
  orderId: string
}

const EditOrderSection: React.FC<EditOrderSectionProps> = ({ order, orderId }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleCancel = () => {
    router.back()
  }

  const handleSuccess = () => {
    router.push("/?success=true")
  }

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

  const mapOrderToFormData = () => {
    if (!order || !order.products) return null

    return {
      customer_name: order.customer_name,
      products: order.products.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    }
  }

  const initialValues = mapOrderToFormData() || undefined

  const handleSubmit = async (data: any) => {
    setSubmitting(true)
    setValidationErrors(null)

    try {
      const payload = {
        customer_name: data.customer_name,
        products: data.products.map((item: any) => ({
          product_id: Number(item.product_id),
          quantity: Number(item.quantity),
        })),
      }

      const response = await updateOrder(orderId, payload)
      if (response.success) {
        handleSuccess()
      } else {
        setError("Failed to update order. Please try again.")
      }
    } catch (err: any) {
      console.error("Error updating order:", err)
      setError("Failed to update order. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Order</h1>
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
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Order</h1>

      {error && <Alert severity="error" message={error} className="mb-4" />}

      {validationErrors && (
        <Alert severity="error" message="You should fill all of mandatory field." className="mb-4" />
      )}

      <Card>
        <OrderForm
          initialValues={initialValues}
          products={products}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={submitting}
          errors={validationErrors}
          type="edit"
        />
      </Card>
    </div>
  )
}

export default EditOrderSection
