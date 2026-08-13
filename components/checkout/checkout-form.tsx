"use client";

import { useCart } from "@/components/providers/cart-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckoutCustomerFields from "./checkout-customer-fields";

import { Checkout, type CheckoutFormValues } from "@/lib/validations/checkout";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, isInitialized } = useCart();

  useEffect(() => {
    if (isInitialized && items.length === 0) {
      router.replace("/cart");
    }
  }, [isInitialized, items.length, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(Checkout),
    defaultValues: {
      fullName: "",
      phone: "",
      province: "",
      city: "",
      postalCode: "",
      address: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    sessionStorage.setItem(
      "dairy-farm-checkout-customer",
      JSON.stringify(data),
    );

    router.push("/checkout/terms");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-8"
    >
      <div>
        <span className="text-primary text-sm font-semibold">
          اطلاعات خریدار
        </span>

        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          تکمیل اطلاعات سفارش
        </h1>

        <p className="text-muted-foreground mt-3 text-sm leading-7">
          اطلاعات زیر برای ثبت و تحویل سفارش استفاده می‌شود.
        </p>
      </div>

      <CheckoutCustomerFields register={register} errors={errors} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50"
      >
        ادامه فرایند خرید
      </button>
    </form>
  );
}
