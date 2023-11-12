import NextAuth from "next-auth/next";

const handler = NextAuth({
  providers: []
})

export { handler as Get, handler as POST }
