import CheckoutForm from "@/components/checkout/checkout-form";
import Container from "@/components/common/container";

export default function CheckoutPage() {
  return (
    <main className="py-10 sm:py-14 lg:py-16">
      <Container>
        <CheckoutForm />
      </Container>
    </main>
  );
}
