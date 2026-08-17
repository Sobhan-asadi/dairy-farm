import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="در حال بارگذاری داشبورد"
      className="space-y-6"
    >
      <div>
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="mt-3 h-4 w-56 rounded-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-card rounded-xl border p-5">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="size-9 rounded-lg" />
            </div>

            <Skeleton className="mt-6 h-8 w-20 rounded-lg" />
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border p-5">
        <Skeleton className="h-5 w-32 rounded-lg" />
        <Skeleton className="mt-3 h-4 w-48 rounded-full" />

        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border p-5">
        <Skeleton className="h-5 w-40 rounded-lg" />
        <Skeleton className="mt-3 h-4 w-56 rounded-full" />
        <Skeleton className="mt-6 h-72 w-full rounded-lg" />
      </div>

      <span className="sr-only">در حال بارگذاری داشبورد...</span>
    </div>
  );
}
