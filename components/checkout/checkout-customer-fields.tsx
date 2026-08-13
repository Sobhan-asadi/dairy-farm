import type { CheckoutFormValues } from "@/lib/validations/checkout";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type CheckoutCustomerFieldsProps = {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
};

export default function CheckoutCustomerFields({
  register,
  errors,
}: CheckoutCustomerFieldsProps) {
  return (
    <FieldGroup>
      {/* FullName */}
      <Field>
        <FieldLabel htmlFor="fullName">نام و نام خانوادگی</FieldLabel>

        <Input id="fullName" type="text" {...register("fullName")} />

        {errors.fullName && (
          <p role="alert" className="text-destructive text-sm">
            {errors.fullName.message}
          </p>
        )}
      </Field>
      {/* Phone */}
      <Field>
        <FieldLabel htmlFor="phone">شماره موبایل</FieldLabel>

        <Input
          id="phone"
          type="tel"
          inputMode="numeric"
          placeholder="09123456789"
          {...register("phone")}
        />

        {errors.phone && (
          <p role="alert" className="text-destructive text-sm">
            {errors.phone.message}
          </p>
        )}
      </Field>
      {/* Province */}
      <Field>
        <FieldLabel htmlFor="province">استان</FieldLabel>

        <Input
          id="province"
          type="text"
          placeholder="مثلاً تهران"
          {...register("province")}
        />

        {errors.province && (
          <p role="alert" className="text-destructive text-sm">
            {errors.province.message}
          </p>
        )}
      </Field>
      {/* City */}
      <Field>
        <FieldLabel htmlFor="city">شهر</FieldLabel>

        <Input
          id="city"
          type="text"
          placeholder="مثلاً تهران"
          {...register("city")}
        />

        {errors.city && (
          <p role="alert" className="text-destructive text-sm">
            {errors.city.message}
          </p>
        )}
      </Field>
      {/* PostalCode */}
      <Field>
        <FieldLabel htmlFor="postalCode">کد پستی</FieldLabel>
        <Input
          id="postalCode"
          type="text"
          inputMode="numeric"
          placeholder="1234567890"
          {...register("postalCode")}
        />
        {errors.postalCode && (
          <p role="alert" className="text-destructive text-sm">
            {errors.postalCode.message}
          </p>
        )}
      </Field>
      {/* Address */}
      <Field>
        <FieldLabel htmlFor="address">آدرس کامل</FieldLabel>
        <Textarea
          id="address"
          rows={4}
          placeholder="آدرس کامل محل تحویل سفارش"
          {...register("address")}
        />
        {errors.address && (
          <p role="alert" className="text-destructive text-sm">
            {errors.address.message}
          </p>
        )}
      </Field>
    </FieldGroup>
  );
}
