import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaymentStatus } from "@/types/order";

type PaymentStatusFilterValue = PaymentStatus | "all";

type PaymentStatusFilterProps = {
  value: PaymentStatusFilterValue;
  onChange: (value: PaymentStatusFilterValue) => void;
};

export function PaymentStatusFilter({
  value,
  onChange,
}: PaymentStatusFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as PaymentStatusFilterValue)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="وضعیت پرداخت" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">همه وضعیت‌های پرداخت</SelectItem>

        <SelectItem value="awaiting-payment">در انتظار پرداخت</SelectItem>

        <SelectItem value="under-review">در حال بررسی</SelectItem>

        <SelectItem value="paid">پرداخت‌شده</SelectItem>

        <SelectItem value="failed">ناموفق</SelectItem>
      </SelectContent>
    </Select>
  );
}
