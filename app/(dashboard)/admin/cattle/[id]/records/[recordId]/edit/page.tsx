import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CattleRecordForm } from "@/components/admin/cattle/cattle-record-form/cattle-record-form";
import { Button } from "@/components/ui/button";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockCattleService } from "@/services/cattle/mock-cattle-service";

type EditCattleRecordPageProps = {
  params: Promise<{
    id: string;
    recordId: string;
  }>;
};

export default async function EditCattleRecordPage({
  params,
}: EditCattleRecordPageProps) {
  await requirePermission("manage-kartaks");

  const { id, recordId } = await params;

  const [cattle, record] = await Promise.all([
    mockCattleService.getCattleById(id),
    mockCattleService.getCattleRecordById(id, recordId),
  ]);

  if (!cattle || !record) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">ویرایش سابقه کارتکس</h1>

          <p className="text-muted-foreground mt-1 text-sm">
            پلاک دام: {cattle.tagNumber}
          </p>
        </div>

        <Button
          variant="outline"
          nativeButton={false}
          render={
            <Link href={`/admin/cattle/${id}`}>
              <ArrowRight />
              بازگشت به کارتکس
            </Link>
          }
        />
      </div>

      <CattleRecordForm cattleId={id} record={record} />
    </div>
  );
}
