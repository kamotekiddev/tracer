import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import client from '@/prisma/client';

const authOptions: AuthOptions = {
    adapter: PrismaAdapter(client),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await client.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user || !user?.hashedPassword) return null;

                const correctPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword,
                );

                if (!correctPassword) return null;
                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
