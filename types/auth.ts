export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
};

export type UserRole =
  "customer" | "manager" | "admin" | "kartaks" | "news-editor";

export type Permission =
  | "view-dashboard"
  | "manage-products"
  | "manage-orders"
  | "manage-users"
  | "manage-news"
  | "manage-kartaks"
  | "view-analytics";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
};

export type AuthResult = {
  user: AuthUser;
};
