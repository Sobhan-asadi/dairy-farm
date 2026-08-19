import { Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CareerApplication } from "@/types/career";

type ApplicationResumeCardProps = {
  resumeUrl: CareerApplication["resumeUrl"];
};

export function ApplicationResumeCard({
  resumeUrl,
}: ApplicationResumeCardProps) {
  return (
    <section className="bg-card rounded-xl border p-5 sm:p-6">
      <h2 className="font-semibold">رزومه متقاضی</h2>

      <div className="mt-5 flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
            <FileText className="size-5" />
          </div>

          <div>
            <p className="text-sm font-medium">فایل رزومه</p>

            <p className="text-muted-foreground mt-1 text-xs">
              فایل ارسال‌شده توسط متقاضی
            </p>
          </div>
        </div>

        <Button
          nativeButton={false}
          variant="outline"
          render={
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download className="size-4" />
              مشاهده رزومه
            </a>
          }
        />
      </div>
    </section>
  );
}
