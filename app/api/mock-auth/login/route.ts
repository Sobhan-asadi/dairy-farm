import type { AuthUser } from "@/types/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type LoginRequestBody = {
  email: string;
  password: string;
};

const MOCK_MANAGER_EMAIL = "manager@dairy.test";
const MOCK_MANAGER_PASSWORD = "Manager123!";

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

  if (
    body.email === MOCK_MANAGER_EMAIL &&
    body.password === MOCK_MANAGER_PASSWORD
  ) {
    user = {
      id: "mock-manager-1",
      fullName: "مدیر مجموعه",
      email: MOCK_MANAGER_EMAIL,
      role: "manager",
      permissions: [
        "view-dashboard",
        "manage-products",
        "manage-orders",
        "manage-users",
        "manage-news",
        "manage-kartaks",
        "view-analytics",
      ],
    };
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
