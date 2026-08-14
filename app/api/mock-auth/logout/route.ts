import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("dairy-farm-session");
  cookieStore.delete("dairy-farm-user");

  return NextResponse.json({
    success: true,
  });
}
