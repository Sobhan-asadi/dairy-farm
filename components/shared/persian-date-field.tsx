"use client";

import { format, isValid, parse } from "date-fns-jalali";
import { useState, type ChangeEvent } from "react";

import { Input } from "@/components/ui/input";

type PersianDateFieldProps = {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function toPersianDate(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  if (!isValid(date)) {
    return "";
  }

  return format(date, "yyyy-MM-dd");
}

export function PersianDateField({
  id,
  value = "",
  onChange,
  placeholder = "1405-01-01",
}: PersianDateFieldProps) {
  const [displayValue, setDisplayValue] = useState(() => toPersianDate(value));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    setDisplayValue(nextValue);

    if (!nextValue) {
      onChange("");
      return;
    }

    const parsedDate = parse(nextValue, "yyyy-MM-dd", new Date());

    if (!isValid(parsedDate)) {
      return;
    }

    const year = parsedDate.getFullYear();

    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");

    const day = String(parsedDate.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${day}`);
  };

  return (
    <Input
      id={id}
      type="text"
      inputMode="numeric"
      dir="ltr"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
