import { notFound } from "next/navigation";

import { CattleForm } from "@/components/admin/cattle/cattle-form/cattle-form";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockCattleService } from "@/services/cattle/mock-cattle-service";

type EditCattlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCattlePage({ params }: EditCattlePageProps) {
  await requirePermission("manage-kartaks");

  const { id } = await params;

  const cattle = await mockCattleService.getCattleById(id);

  if (!cattle) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          ویرایش مشخصات دام
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          ویرایش اطلاعات دام با پلاک{" "}
          <bdi className="text-foreground font-medium">{cattle.tagNumber}</bdi>
        </p>
      </div>

      <CattleForm cattle={cattle} />
    </div>
  );
}
