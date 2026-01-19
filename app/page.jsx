import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function RootPage() {
  const session = await auth();

  // If the user is logged in, send them to the dashboard
  // If not, send them to the login page
  if (session) {
    redirect("/links");
  } else {
    redirect("/login");
  }
}
