import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      firstName: string;
      lastName: string;
      imageUrl?: string | null;
      id: string;
      role: { roleId: number; roleName: string };
      token: string;
    };
  }
}
