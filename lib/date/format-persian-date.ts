type FormatPersianDateOptions = {
  includeTime?: boolean;
};

export function formatPersianDate(
  date: string | Date | null | undefined,
  options: FormatPersianDateOptions = {},
) {
  if (!date) {
    return "ثبت نشده";
  }

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "تاریخ نامعتبر";
  }

  const { includeTime = false } = options;

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(includeTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
  })
    .format(parsedDate)
    .replaceAll("/", "-");
}
