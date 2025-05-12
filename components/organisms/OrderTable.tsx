"use client"

import type React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material"
import { format } from "date-fns"
import ActionButtons from "../molecules/ActionButtons"
import type { Order } from "@/types/order"

interface OrderTableProps {
  orders: Order[]
  loading: boolean
  page: number
  rowsPerPage: number
  totalResults: number
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void
  onRowsPerPageChange: (event: React.ChangeEvent<{ value: unknown }>) => void
  onEdit: (orderId: string) => void
  onView: (orderId: string) => void
  onDelete: (orderId: string) => void
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  loading,
  page,
  rowsPerPage,
  totalResults,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onView,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy")
    } catch (error) {
      return dateString
    }
  }

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`
  }

  return (
    <>
      <TableContainer component={Paper} elevation={0} className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold whitespace-nowrap text-[16px] text-[#052A49]">Order Id</TableCell>
              <TableCell className="font-bold whitespace-nowrap text-[16px] text-[#052A49]">Customer</TableCell>
              <TableCell className="font-bold whitespace-nowrap text-[16px] text-[#052A49]">Total Products</TableCell>
              <TableCell className="font-bold whitespace-nowrap text-[16px] text-[#052A49]">Total Price</TableCell>
              <TableCell className="font-bold whitespace-nowrap text-[16px] text-[#052A49]">Order Date</TableCell>
              <TableCell className="font-bold whitespace-nowrap text-[16px] text-[#052A49]">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="whitespace-nowrap text-[16px] text-[#052A49]">{order.id}</TableCell>
                  <TableCell className="whitespace-nowrap text-[16px] text-[#052A49]">{order.customer_name}</TableCell>
                  <TableCell className="whitespace-nowrap text-[16px] text-[#052A49]">{order.total_products}</TableCell>
                  <TableCell className="whitespace-nowrap text-[16px] text-[#052A49]">{formatPrice(order.total_price || 0)}</TableCell>
                  <TableCell className="whitespace-nowrap text-[16px] text-[#052A49]">{formatDate(order.created_at || "")}</TableCell>
                  <TableCell className="whitespace-nowrap text-[16px] text-[#052A49]">
                    <ActionButtons
                      onEdit={() => onEdit(order.id || "")}
                      onView={() => onView(order.id || "")}
                      onDelete={() => onDelete(order.id || "")}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-[#052A49]">Show</span>
          <FormControl size="small" className="w-20 mr-2">
            <Select value={rowsPerPage} onChange={(e) => onRowsPerPageChange(e as any)} className="text-[#052A49]">
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <span className="text-[#052A49]">per page of {totalResults} results</span>
        </div>

        <Pagination
          count={Math.ceil(totalResults / rowsPerPage)}
          page={page}
          onChange={onPageChange}
          variant="outlined"
          shape="rounded"
          size="medium"
          sx={{
            '& .MuiPaginationItem-outlined': {
              borderColor: '#052A49',
              color: '#052A49',
            },
            '& .Mui-selected': {
              backgroundColor: '#052A49',
              color: '#fff',
              borderColor: '#052A49',
            },
          }}
        />
      </div>
    </>
  )
}

export default OrderTable
