import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../utils/db/prisma'

const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  session: {
    jwt: false,
    secret: process.env.secer,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id
      return session
    },
  },
}

export default (req, res) => NextAuth(req, res, options)

// jwt: {
//     encryption: true,
//     signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
//   },
//   secret: process.env.secret,
//   callbacks: {
//     async jwt(token, account) {
//       if (account?.accessToken) {
//         token.accessToken = account.accessToken;
//       }
//       return token;
//     },
//     redirect: async (url, _baseUrl) => {
//       if (url === '/profile') {
//         return Promise.resolve('/');
//       }
//       return Promise.resolve('/');
//     },
//   },
