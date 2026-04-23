import type { Metadata } from "next";
import { verifySession } from "@/lib/auth/dal";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AdminModalProvider } from "@/components/admin/AdminModal";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <ThemeProvider>
      <AdminModalProvider>
        <AdminShell userEmail={session.email}>{children}</AdminShell>
      </AdminModalProvider>
    </ThemeProvider>
  );
}
