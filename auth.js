import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb"; // Point this to your NEW raw driver file
import dbConnect from "./lib/db"; // For Mongoose/Credentials
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // 1. Set session strategy to JWT for Credentials compatibility
  session: { strategy: "jwt" },
  providers: [
    Google({
      // Google verifies emails, so we can allow it to link to
      // an existing email/password account safely.
      allowDangerousEmailAccountLinking: true,
    }),
    // To allow login after registration
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect(); // Ensure Mongoose is connected

        // Find user by email
        const user = await User.findOne({ email: credentials.email });

        // Logic check: User must exist and have a password (not a Google-only user)
        if (!user || !user.password) {
          throw new Error(
            "No user found with this email. Try logging in with Google."
          );
        }

        const isMatch = await user.matchPassword(credentials.password);

        if (!isMatch) {
          throw new Error("Invalid password.");
        }

        // Return the user object (this gets encoded into the JWT)
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Points to your custom login page
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // 'user' and 'account' are only defined on the FIRST sign-in
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
});
