import { AuthLayout } from "@/components/auth/AuthLayout";
import { AppHeader } from "@/components/layout/AppHeader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <AppHeader />
      {children}
    </AuthLayout>
  );
}
