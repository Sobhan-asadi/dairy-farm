import { notFound } from "next/navigation";

import { CattleActions } from "@/components/admin/cattle/cattle-details/cattle-actions";
import { CattleInfoCard } from "@/components/admin/cattle/cattle-details/cattle-info-card";
import { CattleRecordsList } from "@/components/admin/cattle/cattle-details/cattle-records-list";
import { CattleSummary } from "@/components/admin/cattle/cattle-details/cattle-summary";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockCattleService } from "@/services/cattle/mock-cattle-service";

type CattleDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CattleDetailsPage({
  params,
}: CattleDetailsPageProps) {
  await requirePermission("manage-kartaks");

  const { id } = await params;

  const cattle = await mockCattleService.getCattleById(id);

  if (!cattle) {
    notFound();
  }

  const records = await mockCattleService.getCattleRecords(cattle.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-muted-foreground text-sm">کارتکس دام</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            پلاک <bdi>{cattle.tagNumber}</bdi>
          </h1>

          <p className="text-muted-foreground mt-2 text-sm">
            مشاهده مشخصات و سوابق ثبت‌شده این دام
          </p>
        </div>

        <CattleActions cattle={cattle} />
      </div>

      <CattleSummary records={records} />

      <CattleInfoCard cattle={cattle} />

      <CattleRecordsList records={records} />
    </div>
  );
}
