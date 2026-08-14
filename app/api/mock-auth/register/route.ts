import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RegisterRequestBody = {
  fullName: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterRequestBody;

  if (!body.fullName || !body.email || !body.password) {
    return NextResponse.json(
      {
        message: "نام، ایمیل و رمز عبور الزامی است.",
      },
      {
        status: 400,
      },
    );
  }

  const user = {
    id: `mock-user-${Date.now()}`,
    fullName: body.fullName,
    email: body.email,
    role: "customer" as const,
    permissions: [],
  };

  const cookieStore = await cookies();

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

  cookieStore.set("dairy-farm-registered-user", JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({
    user,
  });
}
