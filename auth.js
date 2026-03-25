import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb"; // Native MongoDB client (required for adapter)
import dbConnect from "./lib/db"; // Mongoose connection (used for credentials flow)
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Adapter handles user/account/session persistence via MongoDB
  adapter: MongoDBAdapter(clientPromise),

  // Use JWT sessions to support Credentials provider (no database sessions required)
  session: { strategy: "jwt" },

  providers: [
    Google({
      // Google accounts are pre-verified, so it's safe to link them
      // to existing users with the same email address
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Ensure Mongoose connection is established
        await dbConnect();

        // Look up user by email
        const user = await User.findOne({ email: credentials.email });

        // Reject if user doesn't exist or was created via OAuth (no password set)
        if (!user || !user.password) {
          throw new Error(
            "No user found with this email. Try logging in with Google."
          );
        }

        // Validate password against stored hash
        const isMatch = await user.matchPassword(credentials.password);

        if (!isMatch) {
          throw new Error("Invalid password.");
        }

        // Return minimal user payload for JWT
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    // Override default sign-in route
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Runs on sign-in and subsequent requests
      // 'user' and 'account' are only present during initial login

      if (user) {
        token.id = user.id;
      }

      if (account) {
        token.provider = account.provider;
      }

      return token;
    },

    async session({ session, token }) {
      // Expose custom fields from JWT onto the session object

      if (token) {
        session.user.id = token.id;
        session.user.provider = token.provider;
      }

      return session;
    },
  },
});