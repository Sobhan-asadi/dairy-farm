import { notFound } from "next/navigation";

import { OrderCustomerCard } from "@/components/admin/order-details/order-customer-card";
import { OrderItemsCard } from "@/components/admin/order-details/order-items-card";
import { OrderReceiptCard } from "@/components/admin/order-details/order-receipt-card";
import { OrderSummaryCard } from "@/components/admin/order-details/order-summary-card";
import { OrderStatusSelect } from "@/components/admin/orders/order-status-select";
import { PaymentStatusSelect } from "@/components/admin/orders/payment-status-select";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockOrdersService } from "@/services/admin/mock-orders-service";

type AdminOrderDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetailsPage({
  params,
}: AdminOrderDetailsPageProps) {
  await requirePermission("manage-orders");

  const { id } = await params;

  const order = await mockOrdersService.getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">جزئیات سفارش</h1>

        <p className="text-muted-foreground mt-2 text-sm" dir="ltr">
          {order.id}
        </p>
      </div>

      <div className="grid max-w-xl gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">وضعیت سفارش</p>

          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </div>

        {order.paymentMethod === "receipt" && (
          <div>
            <p className="mb-2 text-sm font-medium">وضعیت پرداخت</p>

            <PaymentStatusSelect
              orderId={order.id}
              currentStatus={order.paymentStatus}
            />
          </div>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <OrderCustomerCard customer={order.customer} />

        <OrderSummaryCard order={order} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {order.paymentMethod === "receipt" && (
          <OrderReceiptCard order={order} />
        )}

        <OrderItemsCard items={order.items} />
      </div>
    </div>
  );
}
