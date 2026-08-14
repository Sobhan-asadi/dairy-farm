"use client";

import { useCheckout } from "@/components/providers/checkout-provider";
import type { PaymentMethod } from "@/types/order";
import { CreditCard, ReceiptText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";

export default function CheckoutPayment() {
  const router = useRouter();

  const { draft, setPaymentMethod, completeOrder } = useCheckout();

  const [paymentMethod, setLocalPaymentMethod] =
    useState<PaymentMethod>("online");

  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (!draft) {
      router.replace("/cart");
      return;
    }

    if (!draft.customer) {
      router.replace("/checkout");
      return;
    }

    if (!draft.termsAccepted) {
      router.replace("/checkout/terms");
    }
  }, [draft, router]);

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setLocalPaymentMethod(method);
    setPaymentMethod(method);

    if (method === "online") {
      setReceiptFile(null);
      setFileError("");
    }
  };

  const handleReceiptChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setReceiptFile(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setFileError("فرمت فایل باید JPG، PNG، WebP یا PDF باشد.");
      setReceiptFile(null);
      return;
    }

    if (file.size > maxSize) {
      setFileError("حجم فایل نباید بیشتر از ۵ مگابایت باشد.");
      setReceiptFile(null);
      return;
    }

    setFileError("");
    setReceiptFile(file);
  };

  const handleSubmitPayment = () => {
    if (paymentMethod === "receipt" && !receiptFile) {
      return;
    }

    completeOrder(paymentMethod);
    router.push("/checkout/success");
  };

  if (!draft || !draft.customer || !draft.termsAccepted) {
    return null;
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div>
        <span className="text-primary text-sm font-semibold">روش پرداخت</span>

        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          نحوه پرداخت سفارش را انتخاب کنید
        </h1>

        <p className="text-muted-foreground mt-3 text-sm leading-7">
          می‌توانید پرداخت آنلاین انجام دهید یا رسید واریز را بارگذاری کنید.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handlePaymentMethodChange("online")}
          aria-pressed={paymentMethod === "online"}
          className={`rounded-2xl border p-5 text-right transition-all ${
            paymentMethod === "online"
              ? "border-primary bg-primary/5 ring-primary/20 ring-2"
              : "border-border bg-card hover:bg-muted/50"
          }`}
        >
          <CreditCard className="text-primary size-6" />

          <h2 className="mt-4 font-bold">پرداخت آنلاین</h2>

          <p className="text-muted-foreground mt-2 text-sm leading-7">
            پرداخت امن از طریق درگاه بانکی.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handlePaymentMethodChange("receipt")}
          aria-pressed={paymentMethod === "receipt"}
          className={`rounded-2xl border p-5 text-right transition-all ${
            paymentMethod === "receipt"
              ? "border-primary bg-primary/5 ring-primary/20 ring-2"
              : "border-border bg-card hover:bg-muted/50"
          }`}
        >
          <ReceiptText className="text-primary size-6" />

          <h2 className="mt-4 font-bold">بارگذاری رسید</h2>

          <p className="text-muted-foreground mt-2 text-sm leading-7">
            مبلغ را واریز کنید و تصویر رسید را ارسال کنید.
          </p>
        </button>
      </div>

      <div className="bg-card mt-6 rounded-2xl border p-5 sm:p-6">
        {paymentMethod === "online" ? (
          <div>
            <h2 className="font-bold">پرداخت از طریق درگاه بانکی</h2>

            <p className="text-muted-foreground mt-2 text-sm leading-7">
              پس از ثبت نهایی سفارش به درگاه پرداخت منتقل می‌شوید.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="font-bold">ارسال رسید پرداخت</h2>

            <p className="text-muted-foreground mt-2 text-sm leading-7">
              تصویر یا فایل رسید واریز را بارگذاری کنید.
            </p>

            <div className="mt-5">
              <label
                htmlFor="receipt"
                className="border-border hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition-colors"
              >
                <ReceiptText className="text-primary size-7" />

                <span className="mt-3 text-sm font-bold">انتخاب فایل رسید</span>

                <span className="text-muted-foreground mt-1 text-xs">
                  JPG، PNG، WebP یا PDF — حداکثر ۵ مگابایت
                </span>
              </label>

              <input
                id="receipt"
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleReceiptChange}
                className="sr-only"
              />

              {receiptFile && (
                <p className="text-primary mt-3 text-sm font-medium">
                  فایل انتخاب‌شده: {receiptFile.name}
                </p>
              )}

              {fileError && (
                <p role="alert" className="text-destructive mt-3 text-sm">
                  {fileError}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmitPayment}
        disabled={paymentMethod === "receipt" && !receiptFile}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50"
      >
        {paymentMethod === "online"
          ? "ادامه به پرداخت آنلاین"
          : "ثبت رسید و ادامه"}
      </button>
    </section>
  );
}
