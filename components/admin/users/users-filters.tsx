"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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

const roleLabels = {
  all: "همه نقش‌ها",
  manager: "مدیر",
  admin: "ادمین",
  kartaks: "مسئول کارتکس",
  customer: "مشتری",
} as const;

const statusLabels = {
  all: "همه وضعیت‌ها",
  active: "فعال",
  inactive: "غیرفعال",
} as const;

export function UsersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const role = searchParams.get("role") ?? "all";
  const status = searchParams.get("status") ?? "all";

  const roleLabel =
    role in roleLabels
      ? roleLabels[role as keyof typeof roleLabels]
      : roleLabels.all;

  const statusLabel =
    status in statusLabels
      ? statusLabels[status as keyof typeof statusLabels]
      : statusLabels.all;

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    params.delete("page");

    const query = params.toString();

    router.push(query ? `/admin/users?${query}` : "/admin/users");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateParams({
      search: search.trim(),
    });
  };

  const handleReset = () => {
    setSearch("");
    router.push("/admin/users");
  };

  return (
    <div className="bg-card rounded-xl border p-4">
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_180px_180px_auto]"
      >
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جستجو بر اساس نام یا ایمیل..."
            className="pr-9"
          />
        </div>

        <Select
          value={role}
          onValueChange={(value) =>
            updateParams({
              role: value ?? "all",
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue>{roleLabel}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">همه نقش‌ها</SelectItem>
            <SelectItem value="manager">مدیر</SelectItem>
            <SelectItem value="admin">ادمین</SelectItem>
            <SelectItem value="kartaks">مسئول کارتکس</SelectItem>
            <SelectItem value="customer">مشتری</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(value) =>
            updateParams({
              status: value ?? "all",
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue>{statusLabel}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">همه وضعیت‌ها</SelectItem>
            <SelectItem value="active">فعال</SelectItem>
            <SelectItem value="inactive">غیرفعال</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button type="submit">جستجو</Button>

          <Button type="button" variant="outline" onClick={handleReset}>
            پاک کردن
          </Button>
        </div>
      </form>
    </div>
  );
}
