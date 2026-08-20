"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/order";

import { OrderStatusFilter } from "./filters/order-status-filter";
import { OrdersSearch } from "./filters/orders-search";
import { PaymentMethodFilter } from "./filters/payment-method-filter";
import { PaymentStatusFilter } from "./filters/payment-status-filter";

type StatusFilter = OrderStatus | "all";
type PaymentMethodFilterValue = PaymentMethod | "all";
type PaymentStatusFilterValue = PaymentStatus | "all";

export function OrdersFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const status = (searchParams.get("status") ?? "همه وضعیت‌ها") as StatusFilter;

  const paymentMethod = (searchParams.get("paymentMethod") ??
    "همه روش‌های پرداخت") as PaymentMethodFilterValue;

  const paymentStatus = (searchParams.get("paymentStatus") ??
    "همه وضعیت‌های پرداخت") as PaymentStatusFilterValue;

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete("page");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleSearch = () => {
    updateParams({
      search: search.trim() || null,
    });
  };

  const handleReset = () => {
    setSearch("");
    router.push(pathname);
  };

  const hasFilters =
    Boolean(searchParams.get("search")) ||
    status !== "all" ||
    paymentMethod !== "all" ||
    paymentStatus !== "all";

  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="grid gap-3 xl:grid-cols-[minmax(240px,1fr)_190px_190px_190px_auto]">
        <OrdersSearch
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
        />

        <OrderStatusFilter
          value={status}
          onChange={(value) =>
            updateParams({
              status: value,
            })
          }
        />

        <PaymentStatusFilter
          value={paymentStatus}
          onChange={(value) =>
            updateParams({
              paymentStatus: value,
            })
          }
        />

        <PaymentMethodFilter
          value={paymentMethod}
          onChange={(value) =>
            updateParams({
              paymentMethod: value,
            })
          }
        />

        {hasFilters && (
          <Button type="button" variant="ghost" onClick={handleReset}>
            <X />
            پاک کردن فیلترها
          </Button>
        )}
      </div>
    </div>
  );
}
