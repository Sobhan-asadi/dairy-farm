import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

type CheckoutLayoutProps = {
  children: ReactNode;
};

export default async function CheckoutLayout({
  children,
}: CheckoutLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/checkout");
  }

  return children;
}
