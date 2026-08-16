import { requirePermission } from "@/lib/auth/require-permission";

export default async function AdminPage() {
  await requirePermission("view-dashboard");

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">داشبورد</h1>

      <p className="text-muted-foreground mt-2 text-sm">
        نمای کلی وضعیت مجموعه دامداری
      </p>
    </div>
  );
}
