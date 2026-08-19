import { notFound } from "next/navigation";

import { CattleRecordForm } from "@/components/admin/cattle/cattle-record-form/cattle-record-form";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockCattleService } from "@/services/cattle/mock-cattle-service";

type NewCattleRecordPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewCattleRecordPage({
  params,
}: NewCattleRecordPageProps) {
  await requirePermission("manage-kartaks");

  const { id } = await params;

  const cattle = await mockCattleService.getCattleById(id);

  if (!cattle) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm">ثبت سابقه جدید</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          کارتکس دام با پلاک <bdi>{cattle.tagNumber}</bdi>
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          نوع سابقه را انتخاب کرده و اطلاعات مربوط به آن را ثبت کنید.
        </p>
      </div>

      <CattleRecordForm cattleId={cattle.id} />
    </div>
  );
}
