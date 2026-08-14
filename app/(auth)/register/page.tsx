import RegisterForm from "@/components/auth/register-form";
import Container from "@/components/common/container";

export default function RegisterPage() {
  return (
    <main className="py-10 sm:py-14 lg:py-16">
      <Container>
        <RegisterForm />
      </Container>
    </main>
  );
}
