import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }) {
  return (
    <>
      <main className="p-6">{children}</main>
    </>
  );
}
