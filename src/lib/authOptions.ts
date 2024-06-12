import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await axios.post(`${process.env.URL}/users/login`, {
          email: credentials?.email,
          password: credentials?.password,
        });

        if (res.status !== 200) {
          if (res.status === 201) {
            return { status: 201 };
          }
          return null;
        } else {
          const user = await res.data;
          if (user) {
            return user;
          } else {
            return null;
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
  },
};
