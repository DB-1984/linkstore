import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <main className="p-6">{children}</main>
    </>
  );
}
