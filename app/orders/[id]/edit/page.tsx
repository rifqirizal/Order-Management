import { use } from "react" 
import { getOrderById } from "@/api/orders"
import { notFound } from "next/navigation"
import MainLayout from "@/components/layouts/MainLayout"
import EditOrderSection from "@/components/fragments/EditOrderSection"

export default function EditOrderRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = use(getOrderById(id))

  if (!order) {
    notFound()
  }
  
  return (
    <MainLayout>
      <EditOrderSection order={order} orderId={id} />
    </MainLayout>
  )
}
