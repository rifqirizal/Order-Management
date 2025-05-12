"use client"

import type React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import Card from "../atoms/Card"
import Divider from "../atoms/Divider"
import type { Order } from "@/types/order"

interface OrderDetailViewProps {
  order: Order
  onBack?: () => void
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onBack }) => {
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`
  }

  // Calculate total price from products
  const calculateTotalPrice = () => {
    if (!order.products) return 0
    return order.products.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }

  const totalPrice = order.total_price || calculateTotalPrice()

  return (
    <Card>
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <h3 className="text-gray-600 mb-2">Order ID</h3>
          <p className="text-lg md:text-[16px] text-[#052A49] font-bold ">{order.id || order.order_id}</p>
        </div>

        <div>
          <h3 className="text-gray-600 mb-2">Customer Name</h3>
          <p className="text-lg md:text-[16px] text-[#052A49] font-bold">{order.customer_name}</p>
        </div>

        <div>
          <h3 className="text-gray-600 mb-2">Total Order Price</h3>
          <p className="text-lg md:text-[16px] text-[#052A49] font-bold">{formatPrice(totalPrice)}</p>
        </div>
      </div>

      <Divider />

      <div>
        <h2 className="text-gray-600 mb-4">Product Detail</h2>

        <TableContainer component={Paper} elevation={0} className="overflow-x-auto mb-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold whitespace-nowrap">Product Name</TableCell>
                <TableCell className="font-bold whitespace-nowrap">Quantity</TableCell>
                <TableCell className="font-bold whitespace-nowrap">Price</TableCell>
                <TableCell className="font-bold whitespace-nowrap">Total Product Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap text-[#052A49] ">{item.product.name}</TableCell>
                  <TableCell className="whitespace-nowrap text-[#052A49] ">{item.quantity}</TableCell>
                  <TableCell className="whitespace-nowrap text-[#052A49] ">{formatPrice(item.product.price)}</TableCell>
                  <TableCell className="whitespace-nowrap text-[#052A49] ">{formatPrice(item.product.price * item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Card>
  )
}

export default OrderDetailView
