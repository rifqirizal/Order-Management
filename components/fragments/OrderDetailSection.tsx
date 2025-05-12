"use client"
import type React from "react"
import OrderDetailView from "../organisms/OrderDetailView"
import type { Order } from "@/types/order"

interface OrderDetailSectionProps {
  order: Order
  onBack?: () => void
}

const OrderDetailSection: React.FC<OrderDetailSectionProps> = ({ order }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Order Detail</h1>
      <OrderDetailView order={order} />
    </div>
  )
}

export default OrderDetailSection
