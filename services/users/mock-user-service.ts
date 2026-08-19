import type { User } from "@/types/user";

import type {
  PaginatedUsers,
  UpdateUserInput,
  UserListParams,
  UserService,
} from "./user-service";

type UserMockStore = {
  users: User[];
};

type GlobalWithUserMock = typeof globalThis & {
  __dairyFarmUserMock?: UserMockStore;
};

const globalForUsers = globalThis as GlobalWithUserMock;

const initialUsers: User[] = [
  {
    id: "mock-manager-1",
    fullName: "مدیر مجموعه",
    email: "sobhan@test.com",
    role: "manager",
    status: "active",
    permissions: [
      "view-dashboard",
      "manage-products",
      "manage-orders",
      "manage-users",
      "manage-news",
      "manage-careers",
      "manage-kartaks",
      "manage-permissions",
      "view-analytics",
    ],
    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-01T08:00:00.000Z",
  },
  {
    id: "mock-admin-orders-1",
    fullName: "ادمین سفارش‌ها",
    email: "orders-admin@test.com",
    role: "admin",
    status: "active",
    permissions: ["view-dashboard", "manage-orders"],
    createdAt: "2026-08-02T08:00:00.000Z",
    updatedAt: "2026-08-02T08:00:00.000Z",
  },
  {
    id: "mock-admin-content-1",
    fullName: "ادمین محتوا",
    email: "content-admin@test.com",
    role: "admin",
    status: "active",
    permissions: ["view-dashboard", "manage-news", "manage-careers"],
    createdAt: "2026-08-03T08:00:00.000Z",
    updatedAt: "2026-08-03T08:00:00.000Z",
  },
  {
    id: "mock-admin-products-1",
    fullName: "ادمین محصولات",
    email: "products-admin@test.com",
    role: "admin",
    status: "active",
    permissions: ["view-dashboard", "manage-products"],
    createdAt: "2026-08-04T08:00:00.000Z",
    updatedAt: "2026-08-04T08:00:00.000Z",
  },
  {
    id: "mock-kartaks-1",
    fullName: "مسئول کارتکس",
    email: "kartaks@test.com",
    role: "kartaks",
    status: "active",
    permissions: ["view-dashboard", "manage-kartaks"],
    createdAt: "2026-08-05T08:00:00.000Z",
    updatedAt: "2026-08-05T08:00:00.000Z",
  },
];

function getStore(): UserMockStore {
  if (!globalForUsers.__dairyFarmUserMock) {
    globalForUsers.__dairyFarmUserMock = {
      users: structuredClone(initialUsers),
    };
  }

  return globalForUsers.__dairyFarmUserMock;
}

export const mockUserService: UserService = {
  async getUsers({
    page,
    pageSize,
    search,
    role = "all",
    status = "all",
  }: UserListParams): Promise<PaginatedUsers> {
    const { users } = getStore();

    const safePage = Math.max(page, 1);
    const safePageSize = Math.max(pageSize, 1);

    const normalizedSearch = search?.trim().toLocaleLowerCase("fa-IR") ?? "";

    const filteredUsers = users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        user.fullName.toLocaleLowerCase("fa-IR").includes(normalizedSearch) ||
        user.email.toLocaleLowerCase("en-US").includes(normalizedSearch);

      const matchesRole = role === "all" || user.role === role;

      const matchesStatus = status === "all" || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });

    const totalItems = filteredUsers.length;

    const totalPages = Math.max(Math.ceil(totalItems / safePageSize), 1);

    const currentPage = Math.min(safePage, totalPages);

    const startIndex = (currentPage - 1) * safePageSize;

    return {
      items: filteredUsers.slice(startIndex, startIndex + safePageSize),
      page: currentPage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
    };
  },

  async getUserById(id) {
    const { users } = getStore();

    return users.find((user) => user.id === id) ?? null;
  },

  async updateUser(id, data: UpdateUserInput) {
    const store = getStore();

    const user = store.users.find((item) => item.id === id);

    if (!user) {
      throw new Error("کاربر پیدا نشد.");
    }

    const updatedUser: User = {
      ...user,
      ...data,
      id: user.id,
      permissions: user.permissions,
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString(),
    };

    store.users = store.users.map((item) =>
      item.id === id ? updatedUser : item,
    );

    return updatedUser;
  },

  async updateUserPermissions(id, permissions) {
    const store = getStore();

    const user = store.users.find((item) => item.id === id);

    if (!user) {
      throw new Error("کاربر پیدا نشد.");
    }

    const updatedUser: User = {
      ...user,
      permissions,
      updatedAt: new Date().toISOString(),
    };

    store.users = store.users.map((item) =>
      item.id === id ? updatedUser : item,
    );

    return updatedUser;
  },
};
