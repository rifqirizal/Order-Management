"use client"

import type React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import Button from "../atoms/Button"
import Card from "../atoms/Card"
import Divider from "../atoms/Divider"
import type { Order } from "@/types/order"

interface OrderDetailProps {
  order: Order
  onBack: () => void
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
  return (
    <Card>
      <div className="mb-8">
        <div className="mb-6">
          <h3 className="text-gray-600 mb-2">Order ID</h3>
          <p className="text-xl font-bold">{order.id}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-600 mb-2">Customer Name</h3>
          <p className="text-xl font-bold">{order.customer_name}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-600 mb-2">Total Order Price</h3>
          <p className="text-xl font-bold">{order.total_price}</p>
        </div>
      </div>

      <Divider />

      <div>
        <h2 className="text-gray-600 mb-4">Product Detail</h2>

        <TableContainer component={Paper} elevation={0} className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Product Name</TableCell>
                <TableCell className="font-bold">Quantity</TableCell>
                <TableCell className="font-bold">Price</TableCell>
                <TableCell className="font-bold">Total Product Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.total_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </Card>
  )
}

export default OrderDetail
