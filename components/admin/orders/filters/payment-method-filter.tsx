import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaymentMethod } from "@/types/order";

type PaymentMethodFilterValue = PaymentMethod | "all";

type PaymentMethodFilterProps = {
  value: PaymentMethodFilterValue;
  onChange: (value: PaymentMethodFilterValue) => void;
};

export function PaymentMethodFilter({
  value,
  onChange,
}: PaymentMethodFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as PaymentMethodFilterValue)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="روش پرداخت" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">همه روش‌های پرداخت</SelectItem>

        <SelectItem value="online">پرداخت آنلاین</SelectItem>

        <SelectItem value="receipt">واریز و رسید</SelectItem>
      </SelectContent>
    </Select>
  );
}
