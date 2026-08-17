import type { AuthUser } from "@/types/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type LoginRequestBody = {
  email: string;
  password: string;
};

type MockAccount = {
  password: string;
  user: AuthUser;
};

const mockAccounts: Record<string, MockAccount> = {
  "sobhan@test.com": {
    password: "12345678",
    user: {
      id: "mock-manager-1",
      fullName: "مدیر مجموعه",
      email: "sobhan@test.com",
      role: "manager",
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
    },
  },

  "orders-admin@test.com": {
    password: "12345678",
    user: {
      id: "mock-admin-orders-1",
      fullName: "ادمین سفارش‌ها",
      email: "orders-admin@test.com",
      role: "admin",
      permissions: ["view-dashboard", "manage-orders"],
    },
  },

  "content-admin@test.com": {
    password: "12345678",
    user: {
      id: "mock-admin-content-1",
      fullName: "ادمین محتوا",
      email: "content-admin@test.com",
      role: "admin",
      permissions: ["view-dashboard", "manage-news", "manage-careers"],
    },
  },

  "products-admin@test.com": {
    password: "12345678",
    user: {
      id: "mock-admin-products-1",
      fullName: "ادمین محصولات",
      email: "products-admin@test.com",
      role: "admin",
      permissions: ["view-dashboard", "manage-products"],
    },
  },
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequestBody;

  if (!body.email || !body.password) {
    return NextResponse.json(
      {
        message: "ایمیل و رمز عبور الزامی است.",
      },
      {
        status: 400,
      },
    );
  }

  const cookieStore = await cookies();

  let user: AuthUser;

  const mockAccount = mockAccounts[body.email];

  if (
    process.env.NODE_ENV !== "production" &&
    mockAccount &&
    mockAccount.password === body.password
  ) {
    user = mockAccount.user;
  } else {
    const registeredUserCookie = cookieStore.get(
      "dairy-farm-registered-user",
    )?.value;

    if (!registeredUserCookie) {
      return NextResponse.json(
        {
          message: "ایمیل یا رمز عبور نادرست است.",
        },
        {
          status: 401,
        },
      );
    }

    try {
      user = JSON.parse(registeredUserCookie) as AuthUser;
    } catch {
      return NextResponse.json(
        {
          message: "اطلاعات حساب کاربری معتبر نیست.",
        },
        {
          status: 401,
        },
      );
    }

    if (user.email !== body.email) {
      return NextResponse.json(
        {
          message: "ایمیل یا رمز عبور نادرست است.",
        },
        {
          status: 401,
        },
      );
    }
  }

  cookieStore.set("dairy-farm-session", user.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("dairy-farm-user", JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({
    user,
  });
}
