import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type OrdersSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export function OrdersSearch({ value, onChange, onSearch }: OrdersSearchProps) {
  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSearch();
          }
        }}
        placeholder="شماره سفارش، نام یا موبایل مشتری"
      />

      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={onSearch}
        aria-label="جستجوی سفارش"
      >
        <Search />
      </Button>
    </div>
  );
}
