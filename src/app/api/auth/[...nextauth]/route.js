import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "username", type: "text", placeholder: "Username" },
        email: { label: "email", type: "email", placeholder: "Email" },
        // mobile:{ label: "mobile", type:"test",placeholder:"Mobile"},
        createdAt: {
          label: "CreateDate",
          type: "date",
          placeholder: "Created Date",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          // email과 password가 있는지  체크
          if (!credentials.email || !credentials.password) {
            return null
          }
          // user가 존재하는 체크
          const user = await prisma.User.findUnique({
            where: {
                email: credentials.email,
              }
          });

          if (!user) {
            return null
          }

          // password가 valid한지 체크
          const comparedPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!comparedPassword) {
            return null
          }

          // 모든 내용이 valid하면 user 리턴
          return Promise.resolve({
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            // image: user.image,
          });
        } catch (error) {
          console.error("Error during authorization:", error);
          return null
        }
      },
    }),
  ],
  session: {
    strategy:"jwt",
    // strategy: "session",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // Force session update every day
  },


  // secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
