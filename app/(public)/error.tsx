"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="bg-destructive/10 text-destructive mx-auto flex size-16 items-center justify-center rounded-2xl">
          <AlertTriangle className="size-7" aria-hidden="true" />
        </div>

        <p className="text-destructive mt-6 text-sm font-bold">
          خطای غیرمنتظره
        </p>

        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          مشکلی پیش آمده است
        </h1>

        <p className="text-muted-foreground mx-auto mt-4 max-w-md leading-8">
          هنگام نمایش این صفحه مشکلی رخ داد. می‌توانید دوباره تلاش کنید یا به
          صفحه اصلی برگردید.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset} className="gap-2">
            <RefreshCw className="size-4" aria-hidden="true" />
            تلاش دوباره
          </Button>

          <Link
            href="/"
            className="border-border bg-background hover:bg-muted inline-flex h-9 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors"
          >
            <Home className="size-4" aria-hidden="true" />
            صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
