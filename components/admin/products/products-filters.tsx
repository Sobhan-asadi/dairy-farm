"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterValue = "all" | "direct" | "request";
type AvailabilityValue = "all" | "available" | "unavailable";

export function ProductsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const purchaseType =
    (searchParams.get("purchaseType") as FilterValue | null) ?? "all";

  const availability =
    (searchParams.get("availability") as AvailabilityValue | null) ?? "all";

  const hasFilters =
    Boolean(searchParams.get("search")) ||
    purchaseType !== "all" ||
    availability !== "all";

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

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateParams({
      search: search.trim() || null,
    });
  };

  const handleReset = () => {
    setSearch("");
    router.push(pathname);
  };

  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <form onSubmit={handleSearch} className="flex min-w-0 flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />

            <Input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجو در نام یا دسته‌بندی محصول..."
              className="pr-9"
              aria-label="جستجوی محصولات"
            />
          </div>

          <Button type="submit" variant="secondary">
            جستجو
          </Button>
        </form>

        <div className="grid gap-3 sm:grid-cols-2 xl:flex">
          <Select
            value={purchaseType}
            onValueChange={(value) =>
              updateParams({
                purchaseType: value,
              })
            }
          >
            <SelectTrigger className="w-full sm:min-w-40">
              <SelectValue placeholder="نوع فروش" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">همه نوع‌های فروش</SelectItem>
              <SelectItem value="direct">خرید مستقیم</SelectItem>
              <SelectItem value="request">ثبت درخواست</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={availability}
            onValueChange={(value) =>
              updateParams({
                availability: value,
              })
            }
          >
            <SelectTrigger className="w-full sm:min-w-36">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              <SelectItem value="available">فعال</SelectItem>
              <SelectItem value="unavailable">غیرفعال</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            className="shrink-0"
          >
            <X className="size-4" />
            پاک کردن فیلترها
          </Button>
        )}
      </div>
    </div>
  );
}
