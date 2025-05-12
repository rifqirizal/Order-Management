"use client"

import { useRouter } from "next/navigation"
import MainLayout from "@/components/layouts/MainLayout"
import AddOrderSection from "@/components/fragments/AddOrderSection"

export default function NewOrderPage() {
  const router = useRouter()

  const handleCancel = () => {
    router.back()
  }

  const handleSuccess = () => {
    router.push("/?success=true")
  }

  return (
    <MainLayout>
      <AddOrderSection onCancel={handleCancel} onSuccess={handleSuccess} />
    </MainLayout>
  )
}
