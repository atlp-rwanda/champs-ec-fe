import { authOption } from "@/lib/authOptions";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };