"use client";

import { useCheckout } from "@/components/providers/checkout-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutTerms() {
  const router = useRouter();

  const { customer, acceptTerms } = useCheckout();

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!customer) {
      router.replace("/checkout");
    }
  }, [customer, router]);

  const handleContinue = () => {
    if (!accepted) {
      return;
    }

    acceptTerms();

    router.push("/checkout/payment");
  };

  if (!customer) {
    return null;
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div>
        <span className="text-primary text-sm font-semibold">شرایط خرید</span>

        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          قوانین و شرایط ثبت سفارش
        </h1>

        <p className="text-muted-foreground mt-3 text-sm leading-7">
          قبل از ادامه فرایند خرید، شرایط زیر را مطالعه و تأیید کنید.
        </p>
      </div>

      <div className="bg-card mt-8 rounded-2xl border p-5 sm:p-6">
        <div className="text-muted-foreground space-y-4 text-sm leading-8">
          <p>اطلاعات واردشده توسط خریدار باید صحیح و قابل استناد باشد.</p>

          <p>قیمت و موجودی نهایی سفارش در زمان ثبت نهایی بررسی خواهد شد.</p>

          <p>زمان و شرایط ارسال بر اساس نوع محصول و مقصد سفارش مشخص می‌شود.</p>

          <p>در محصولات نیازمند استعلام، ثبت درخواست به معنی خرید قطعی نیست.</p>
        </div>

        <label className="border-border mt-6 flex cursor-pointer items-start gap-3 border-t pt-5">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-1 size-4"
          />

          <span className="text-sm leading-7">
            قوانین و شرایط خرید را مطالعه کرده‌ام و می‌پذیرم.
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!accepted}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50"
      >
        ادامه به مرحله پرداخت
      </button>
    </section>
  );
}
