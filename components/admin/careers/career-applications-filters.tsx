"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CareerApplicationStatus } from "@/types/career";

type StatusFilter = CareerApplicationStatus | "all";

export function CareerApplicationsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const status = (searchParams.get("status") ?? "all") as StatusFilter;

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

  const hasFilters = Boolean(searchParams.get("search")) || status !== "all";

  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_220px_auto]">
        <div className="flex gap-2">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="نام، موبایل یا ایمیل متقاضی"
          />

          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={handleSearch}
            aria-label="جستجوی درخواست همکاری"
          >
            <Search />
          </Button>
        </div>

        <Select
          value={status}
          onValueChange={(value) =>
            updateParams({
              status: value,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="وضعیت درخواست" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">همه وضعیت‌ها</SelectItem>
            <SelectItem value="new">جدید</SelectItem>
            <SelectItem value="reviewing">در حال بررسی</SelectItem>
            <SelectItem value="accepted">پذیرفته‌شده</SelectItem>
            <SelectItem value="rejected">ردشده</SelectItem>
          </SelectContent>
        </Select>

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
