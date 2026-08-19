import { CattleForm } from "@/components/admin/cattle/cattle-form/cattle-form";
import { requirePermission } from "@/lib/auth/require-permission";

export default async function NewCattlePage() {
  await requirePermission("manage-kartaks");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">ثبت دام جدید</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          مشخصات دام را برای ایجاد پرونده و کارتکس جدید وارد کنید.
        </p>
      </div>

      <CattleForm />
    </div>
  );
}
