"use client"
import React from "react"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/layouts/MainLayout"
import OrderManagementSection from "@/components/fragments/OrderManagementSection"

export default function Home() {
  const router = useRouter()

  const handleAddNew = () => {
    router.push("/orders/new")
  }

  const handleEdit = (orderId: string) => {
    router.push(`/orders/${orderId}/edit`)
  }

  const handleView = (orderId: string) => {
    router.push(`/orders/${orderId}`)
  }

  return (
    <MainLayout>
      <React.Suspense fallback={<div>Loading...</div>}>
        <OrderManagementSection
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onView={handleView}
        />
      </React.Suspense>
    </MainLayout>
  )
}
