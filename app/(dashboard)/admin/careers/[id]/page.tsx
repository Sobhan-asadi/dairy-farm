import { notFound } from "next/navigation";

import { ApplicantInfoCard } from "@/components/admin/careers/application-details/applicant-info-card";
import { ApplicationMessageCard } from "@/components/admin/careers/application-details/application-message-card";
import { ApplicationResumeCard } from "@/components/admin/careers/application-details/application-resume-card";
import { ApplicationStatusSelect } from "@/components/admin/careers/application-details/application-status-select";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockCareerService } from "@/services/careers/api-career-service";

type CareerApplicationDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CareerApplicationDetailsPage({
  params,
}: CareerApplicationDetailsPageProps) {
  await requirePermission("manage-careers");

  const { id } = await params;

  const application = await mockCareerService.getApplicationById(id);

  if (!application) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            جزئیات درخواست همکاری
          </h1>

          <p className="text-muted-foreground mt-2 text-sm" dir="ltr">
            {application.id}
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <p className="mb-2 text-sm font-medium">وضعیت درخواست</p>

          <ApplicationStatusSelect
            applicationId={application.id}
            currentStatus={application.status}
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ApplicantInfoCard application={application} />

        <ApplicationMessageCard message={application.message} />
      </div>

      <ApplicationResumeCard resumeUrl={application.resumeUrl} />
    </div>
  );
}
