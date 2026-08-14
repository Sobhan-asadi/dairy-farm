import { getCurrentUser } from "@/lib/auth/get-current-user";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();

  return NextResponse.json({
    user,
  });
}
