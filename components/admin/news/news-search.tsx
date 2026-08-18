"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(currentSearch);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    const normalizedSearch = search.trim();

    if (normalizedSearch) {
      params.set("search", normalizedSearch);
    } else {
      params.delete("search");
    }

    params.delete("page");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleReset = () => {
    setSearch("");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    params.delete("page");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="bg-card flex flex-col gap-3 rounded-xl border p-4 sm:flex-row">
      <div className="flex w-full gap-2 sm:max-w-md">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="جستجو در عنوان یا دسته‌بندی خبر"
        />

        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={handleSearch}
          aria-label="جستجوی اخبار"
        >
          <Search />
        </Button>
      </div>

      {currentSearch && (
        <Button type="button" variant="ghost" onClick={handleReset}>
          <X />
          پاک کردن جستجو
        </Button>
      )}
    </div>
  );
}
