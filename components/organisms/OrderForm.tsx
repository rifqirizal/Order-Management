"use client"

import React, { useState } from "react"
import Button from "../atoms/Button"
import FormField from "../molecules/FormField"
import ProductFormRow from "../molecules/ProductFormRow"
import type { Product } from "@/types/product"
import Divider from "../atoms/Divider"

interface OrderFormProduct {
  product_id: number
  quantity: number
}

interface OrderFormData {
  customer_name: string
  products: OrderFormProduct[]
}

interface OrderFormProps {
  initialValues?: OrderFormData
  products: Product[]
  onSubmit: (data: OrderFormData) => void
  onCancel: () => void
  isSubmitting?: boolean
  type?: string,
  errors?: {
    customer_name?: string
    products?: {
      product_id?: string
      quantity?: string
    }[]
  }
}

const OrderForm: React.FC<OrderFormProps> = ({
  initialValues,
  products,
  onSubmit,
  onCancel,
  isSubmitting = false,
  type,
  errors,
}) => {
  const [formData, setFormData] = useState<OrderFormData>(
    initialValues || {
      customer_name: "",
      products: [{ product_id: 0, quantity: 1 }],
    },
  )

  const [productPrices, setProductPrices] = useState<Record<number, number>>(() => {
    const priceMap: Record<number, number> = {}
    products.forEach((product) => {
      priceMap[product.id] = product.price
    })
    return priceMap
  })

  const [totalPrice, setTotalPrice] = useState<number>(0)

  React.useEffect(() => {
    calculateTotalPrice()
  }, [formData.products])

  const calculateTotalPrice = () => {
    let total = 0
    formData.products.forEach((product) => {
      if (product.product_id && product.quantity) {
        const price = productPrices[product.product_id] || 0
        total += price * product.quantity
      }
    })
    setTotalPrice(total)
  }

  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      customer_name: e.target.value,
    })
  }

  const handleProductChange = (index: number, productId: number) => {
    const updatedProducts = [...formData.products]
    updatedProducts[index] = {
      ...updatedProducts[index],
      product_id: productId,
    }
    setFormData({
      ...formData,
      products: updatedProducts,
    })
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedProducts = [...formData.products]
    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity,
    }
    setFormData({
      ...formData,
      products: updatedProducts,
    })
  }

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { product_id: 0, quantity: 1 }],
    })
  }

  const handleRemoveProduct = (index: number) => {
    if (formData.products.length === 1) return
    const updatedProducts = [...formData.products]
    updatedProducts.splice(index, 1)
    setFormData({
      ...formData,
      products: updatedProducts,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }))

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        type="text"
        label="Customer Name"
        name="customer_name"
        value={formData.customer_name}
        onChange={handleCustomerNameChange}
        required
        error={!!errors?.customer_name}
        helperText={errors?.customer_name}
        className="w-[70vh]"
        disabled={type === "edit" ? true : false}
      />
      <Divider />
      
      {formData.products.map((product, index) => (
        <ProductFormRow
          key={index}
          index={index}
          productId={product.product_id}
          quantity={product.quantity}
          productOptions={productOptions}
          productPrices={productPrices}
          onProductChange={handleProductChange}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveProduct}
          errors={errors?.products?.[index]}
          showRemoveButton={index > 0}
        />
      ))}

      <div className="mb-14">
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddProduct}
          className="w-full sm:w-auto font-semibold"
        >
          Add More Product
        </Button>
      </div>

      <div className="mb-6">
        <FormField
          type="text"
          label="Total Order Price"
          name="total_price"
          value={`Rp ${totalPrice.toLocaleString()}`}
          disabled
          className="bg-gray-100"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:space-x-2">
        <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full sm:w-[20vh] bg-[#1BA8DF] font-semibold">
          {isSubmitting ? "Saving..." : "Save"}
        </Button>

        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-[20vh] font-semibold text-[#052A49] border-[#E0E0E0]">
          Back
        </Button>
      </div>
    </form>
  )
}

export default OrderForm
