import CheckoutSuccess from "@/components/checkout/checkout-success";
import Container from "@/components/common/container";

export default function SuccessPage() {
  return (
    <main className="py-10 sm:py-14 lg:py-16">
      <Container>
        <CheckoutSuccess />
      </Container>
    </main>
  );
}
