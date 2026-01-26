import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  let session;

  try {
    session = await auth();
  } catch (error) {
    // If we catch the JWTSessionError (poisoned cookie),
    // we boot them to login to start fresh.
    console.error("Auth session corrupted, redirecting to login.");
    redirect("/login");
  }

  if (session) {
    redirect("/links");
  } else {
    redirect("/login");
  }

  // This technically never renders because of the redirects
  return null;
}
