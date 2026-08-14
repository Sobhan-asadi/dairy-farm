import { cookies } from "next/headers";

import type { AuthUser } from "@/types/auth";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("dairy-farm-session")?.value;
  const userCookie = cookieStore.get("dairy-farm-user")?.value;

  if (!sessionId || !userCookie) {
    return null;
  }

  try {
    const user = JSON.parse(userCookie) as AuthUser;

    if (user.id !== sessionId) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}
