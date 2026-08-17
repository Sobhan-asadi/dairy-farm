"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

type AdminErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ error, reset }: AdminErrorProps) {
  return (
    <div
      role="alert"
      className="bg-card flex min-h-80 flex-col items-center justify-center rounded-xl border p-6 text-center"
    >
      <div className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-xl">
        <AlertTriangle className="size-5" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">
        بارگذاری داشبورد با مشکل مواجه شد
      </h2>

      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
        دریافت اطلاعات داشبورد انجام نشد. لطفاً دوباره تلاش کنید.
      </p>

      <Button type="button" onClick={reset} className="mt-6">
        <RefreshCw className="size-4" />
        تلاش دوباره
      </Button>

      {process.env.NODE_ENV === "development" && (
        <p
          dir="ltr"
          className="text-muted-foreground mt-6 max-w-full text-xs break-all"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
