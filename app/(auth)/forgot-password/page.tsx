import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import Container from "@/components/common/container";

export default function ForgotPasswordPage() {
  return (
    <main className="py-10 sm:py-14 lg:py-16">
      <Container>
        <ForgotPasswordForm />
      </Container>
    </main>
  );
}
