"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Card from "../atoms/Card"
import Button from "../atoms/Button"
import Alert from "../atoms/Alert"
import SearchField from "../molecules/SearchField"
import DatePickerField from "../molecules/DatePickerField"
import OrderTable from "../organisms/OrderTable"
import DeleteConfirmDialog from "../molecules/DeleteConfirmDialog"
import { format } from "date-fns"
import { getOrders, deleteOrder } from "@/api/orders"
import type { Order } from "@/types/order"

interface OrderManagementSectionProps {
  onAddNew: () => void
  onEdit: (orderId: string) => void
  onView: (orderId: string) => void
}

const OrderManagementSection: React.FC<OrderManagementSectionProps> = ({
  onAddNew,
  onEdit,
  onView,
}) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState("")
  const [orderDate, setOrderDate] = useState<Date | null>(null)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalResults, setTotalResults] = useState(0)
  const searchParams = useSearchParams()
  const router = useRouter()
  const successMessage = searchParams.get("success") === "true" ? "Your data has been successfully saved." : null
  const [alertMessage, setAlertMessage] = useState<string | null>(successMessage || null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (successMessage) {
      setAlertMessage(successMessage)
    }
  }, [successMessage])

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [alertMessage])

   useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("success")
        router.replace(`?${params.toString()}`)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [successMessage])

  useEffect(() => {
    fetchOrders()
  }, [page, rowsPerPage, customerName, orderDate])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params: any = {
        page,
        limit: rowsPerPage,
      }

      if (customerName) {
        params.customer_name = customerName
      }

      if (orderDate) {
        params.order_date = format(orderDate, "yyyy-MM-dd")
      }

      const response = await getOrders(params)
      setOrders(response.list || [])
      setTotalResults(response.total || 0)
      setError(null)
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError("Failed to fetch orders. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchOrders()
  }

  const handleDeleteClick = (orderId: string) => {
    setOrderToDelete(orderId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!orderToDelete) return

    setDeleting(true)
    try {
      const response = await deleteOrder(orderToDelete)
      if (response.success) {
        setAlertMessage("Order deleted successfully")
        // Refresh the order list
        fetchOrders()
      } else {
        setError("Failed to delete order. Please try again.")
      }
    } catch (err) {
      console.error("Error deleting order:", err)
      setError("Failed to delete order. Please try again.")
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
      setOrderToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setOrderToDelete(null)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleRowsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(Number(event.target.value))
    setPage(1)
  }

  const handleCloseAlert = () => {
    setAlertMessage(null)
  }

  return (
    <div>
      <div className="relative mb-10">
        <h1 className="text-2xl font-bold text-center">Order Management</h1>

        {alertMessage && (
          <div className="absolute right-0 -translate-y-1/2">
            <Alert
              severity="success"
              message={alertMessage}
              onClose={handleCloseAlert}
            />
          </div>
        )}
      </div>
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-64">
              <SearchField
                label="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                onSearch={handleSearch}
                placeholder="Input customer name"
              />
            </div>

            <div className="w-full md:w-64">
              <DatePickerField
                label="Create Date"
                value={orderDate}
                onChange={setOrderDate}
                placeholder="Select date"
              />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Button variant="primary" onClick={onAddNew} className="h-10 mt-2 md:mt-6 w-full md:w-auto bg-[#1BA8DF] font-semibold">
              Add New Order
            </Button>
          </div>
        </div>

        {error && <Alert severity="error" message={error} />}

        <OrderTable
          orders={orders}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          totalResults={totalResults}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={onEdit}
          onView={onView}
          onDelete={handleDeleteClick}
        />
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={deleting}
        message="Are you sure you want to delete this order? This action cannot be undone."
      />
    </div>
  )
}

export default OrderManagementSection
