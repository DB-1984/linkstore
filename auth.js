import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";
import dbConnect from "./lib/db"; // Assuming you have the Mongoose connector
import User from "./models/User";
import bcrypt from "bcryptjs";

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

        // Verify password
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) {
          throw new Error("Invalid password.");
        }

        // Return the user object (this gets encoded into the JWT)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Points to your custom login page
  },
  callbacks: {
    // When using JWT strategy, the 'user' object is passed to 'jwt' on sign in
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Then the 'token' is passed to the session
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
