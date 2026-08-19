import { UsersFilters } from "@/components/admin/users/users-filters";
import { UsersPagination } from "@/components/admin/users/users-pagination";
import { UsersTable } from "@/components/admin/users/users-table";
import { requirePermission } from "@/lib/auth/require-permission";
import { mockUserService } from "@/services/users/mock-user-service";

type UsersPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    role?: string;
    status?: string;
  }>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  await requirePermission("manage-users");

  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);

  const role =
    params.role === "customer" ||
    params.role === "manager" ||
    params.role === "admin" ||
    params.role === "kartaks"
      ? params.role
      : "all";

  const status =
    params.status === "active" || params.status === "inactive"
      ? params.status
      : "all";

  const users = await mockUserService.getUsers({
    page,
    pageSize: 8,
    search: params.search,
    role,
    status,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          مدیریت کاربران
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          مشاهده و مدیریت کاربران و اعضای پنل
        </p>
      </div>

      <div className="bg-card rounded-xl border p-5 sm:p-6">
        <p className="text-muted-foreground text-sm">
          تعداد کاربران:{" "}
          <span className="text-foreground font-medium">
            {users.totalItems.toLocaleString("fa-IR")}
          </span>
        </p>
      </div>
      <UsersFilters />

      <UsersTable users={users.items} />
      <UsersPagination page={users.page} totalPages={users.totalPages} />
    </div>
  );
}
