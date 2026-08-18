import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ReceiptPaymentOrder } from "@/types/order";

type OrderReceiptCardProps = {
  order: ReceiptPaymentOrder;
};

export function OrderReceiptCard({ order }: OrderReceiptCardProps) {
  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="font-semibold">رسید پرداخت</h2>

        <p className="text-muted-foreground mt-2 text-sm">
          رسید ارسال‌شده توسط مشتری برای بررسی مدیر
        </p>
      </div>

      <div className="mt-5">
        {order.receipt.fileType.startsWith("image/") ? (
          <Dialog>
            <DialogTrigger
              className="bg-muted relative block h-48 w-36 cursor-zoom-in overflow-hidden rounded-lg border"
              aria-label="مشاهده تصویر رسید"
            >
              <Image
                src={order.receipt.fileUrl}
                alt={`رسید سفارش ${order.id}`}
                fill
                sizes="144px"
                className="object-cover"
              />
            </DialogTrigger>
            <p className="text-muted-foreground mt-2 text-sm">
              برای مشاهده بهتر تصویر لطفا روی تصویر کلیک کنید
            </p>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-auto p-4">
              <DialogTitle className="sr-only">
                رسید سفارش {order.id}
              </DialogTitle>

              <div className="relative mx-auto h-screen w-full">
                <Image
                  src={order.receipt.fileUrl}
                  alt={`رسید سفارش ${order.id}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 768px"
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <a
            href={order.receipt.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary text-sm font-medium underline underline-offset-4"
          >
            مشاهده فایل رسید
          </a>
        )}

        <p className="text-muted-foreground mt-3 text-xs" dir="ltr">
          {order.receipt.fileName}
        </p>
      </div>
    </section>
  );
}
