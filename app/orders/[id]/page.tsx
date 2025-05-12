import { use } from "react" 
import { getOrderById } from "@/api/orders"
import { notFound } from "next/navigation"
import MainLayout from "@/components/layouts/MainLayout"
import OrderDetailSection from "@/components/fragments/OrderDetailSection"

export default function OrderDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = use(getOrderById(id))

  if (!order) {
    notFound()
  }

  return (
    <MainLayout>
      <OrderDetailSection order={order} />
    </MainLayout>
  )
}
