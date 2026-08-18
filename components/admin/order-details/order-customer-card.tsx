import type { Order } from "@/types/order";

type OrderCustomerCardProps = {
  customer: Order["customer"];
};

export function OrderCustomerCard({ customer }: OrderCustomerCardProps) {
  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <h2 className="font-semibold">اطلاعات مشتری</h2>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">نام و نام خانوادگی</span>

          <span className="font-medium">{customer.fullName}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">شماره موبایل</span>

          <span dir="ltr" className="font-medium">
            {customer.phone}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">استان</span>

          <span className="font-medium">{customer.province}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">شهر</span>

          <span className="font-medium">{customer.city}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">کد پستی</span>

          <span dir="ltr" className="font-medium">
            {customer.postalCode}
          </span>
        </div>

        <div>
          <span className="text-muted-foreground">آدرس</span>

          <p className="mt-2 leading-7">{customer.address}</p>
        </div>
      </div>
    </section>
  );
}
