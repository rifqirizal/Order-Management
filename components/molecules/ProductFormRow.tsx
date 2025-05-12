"use client"

import type React from "react"
import { IconButton } from "@mui/material"
import { X } from "lucide-react"
import FormField from "./FormField"

interface ProductFormRowProps {
  index: number
  productId: number
  quantity: number
  productOptions: { value: number; label: string }[]
  productPrices: Record<number, number>
  onProductChange: (index: number, productId: number) => void
  onQuantityChange: (index: number, quantity: number) => void
  onRemove: (index: number) => void
  errors?: {
    productId?: string
    quantity?: string
  }
  showRemoveButton: boolean
}

const ProductFormRow: React.FC<ProductFormRowProps> = ({
  index,
  productId,
  quantity,
  productOptions,
  productPrices,
  onProductChange,
  onQuantityChange,
  onRemove,
  errors,
  showRemoveButton,
}) => {
  const productPrice = productId ? productPrices[productId] || 0 : 0
  const totalPrice = productId && quantity ? productPrice * quantity : 0

  return (
    <div className="mb-2 p-4-200 rounded-lg py-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600">Product Detail</h3>
        {showRemoveButton && (
          <IconButton onClick={() => onRemove(index)} size="small" className="text-red-500">
            <X className="h-4 w-4" />
          </IconButton>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          type="select"
          label="Product Name"
          name={`products[${index}].product_id`}
          value={productId || ""}
          onChange={(e) => onProductChange(index, Number(e.target.value))}
          options={productOptions}
          required
          error={!!errors?.productId}
          helperText={errors?.productId}
          placeholder="Select product name"
        />

        <FormField
          type="text"
          label="Price"
          name={`products[${index}].price`}
          value={productId ? `Rp ${productPrice.toLocaleString()}` : "You need to select product name"}
          onChange={() => {}}
          disabled
          className="bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          type="number"
          label="Quantity"
          name={`products[${index}].quantity`}
          value={quantity || ""}
          onChange={(e) => onQuantityChange(index, Number(e.target.value))}
          required
          error={!!errors?.quantity}
          helperText={errors?.quantity}
        />

        <FormField
          type="text"
          label="Total Product Price"
          name={`products.total_price`}
          value={productId && quantity ? `Rp ${totalPrice.toLocaleString()}` : "You need to input quantity"}
          onChange={() => {}}
          disabled
          className="bg-gray-100"
        />
      </div>
    </div>
  )
}

export default ProductFormRow
