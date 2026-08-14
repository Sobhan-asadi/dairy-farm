import LoginForm from "@/components/auth/login-form";
import Container from "@/components/common/container";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="py-10 sm:py-14 lg:py-16">
      <Container>
        <Suspense>
          <LoginForm />
        </Suspense>
      </Container>
    </main>
  );
}
