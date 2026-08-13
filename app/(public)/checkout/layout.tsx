import { CheckoutProvider } from "@/components/providers/checkout-provider";

type CheckoutLayoutProps = {
  children: React.ReactNode;
};

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
