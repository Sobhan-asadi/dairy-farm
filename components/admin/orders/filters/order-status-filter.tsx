import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderStatus } from "@/types/order";

type OrderStatusFilterValue = OrderStatus | "all";

type OrderStatusFilterProps = {
  value: OrderStatusFilterValue;
  onChange: (value: OrderStatusFilterValue) => void;
};

export function OrderStatusFilter({ value, onChange }: OrderStatusFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as OrderStatusFilterValue)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="وضعیت سفارش" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">همه وضعیت‌های سفارش</SelectItem>

        <SelectItem value="pending">در انتظار بررسی</SelectItem>

        <SelectItem value="under-review">در حال بررسی</SelectItem>

        <SelectItem value="completed">تکمیل‌شده</SelectItem>

        <SelectItem value="cancelled">لغوشده</SelectItem>
      </SelectContent>
    </Select>
  );
}
