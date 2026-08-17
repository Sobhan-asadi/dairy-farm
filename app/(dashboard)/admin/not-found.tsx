import { ArrowRight, SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="bg-card flex min-h-80 flex-col items-center justify-center rounded-xl border p-6 text-center">
      <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl">
        <SearchX className="size-5" />
      </div>

      <h1 className="mt-4 text-xl font-semibold">صفحه موردنظر پیدا نشد</h1>

      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
        آدرس واردشده در پنل مدیریت وجود ندارد یا ممکن است تغییر کرده باشد.
      </p>

      <Button
        nativeButton={false}
        render={<Link href="/admin" />}
        className="mt-6"
      >
        <ArrowRight className="size-4" />
        بازگشت به داشبورد
      </Button>
    </div>
  );
}
