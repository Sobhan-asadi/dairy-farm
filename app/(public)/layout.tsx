import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar/navbar";
import { CheckoutProvider } from "@/components/providers/checkout-provider";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CheckoutProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </CheckoutProvider>
  );
}
