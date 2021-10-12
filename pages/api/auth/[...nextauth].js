import GoogleProvider from 'next-auth/providers/google';

let providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECERT,
  }),
];
