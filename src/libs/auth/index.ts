import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import hashing from '@/libs/hashing';
import bcrypt from 'bcrypt';

interface User {
    name: string | null;
    email: string | null;
    id: string;
    image?: string;
    role: string;
}

export const BASE_PATH = "/api/auth";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                const passwordRegex = /^(?=.*\d).{8,}$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!credentials || credentials.email.trim() === '' || !emailRegex.test(credentials.email) || credentials.password.trim() === '' || !passwordRegex.test(credentials.password)) {
                    throw new Error("Invalid credentials");
                }

                // Find user by email
                const user = await prisma.users.findFirst({
                    where: {
                        user_email: credentials.email,
                    },
                });

                if (user) {
                    // Verify password
                    const isMatch = await bcrypt.compare(credentials.password, user.pass_hash);
                    if (isMatch) {
                        return {
                            name: user.user_name,
                            email: user.user_email,
                            id: String(user.user_id),
                            image: '',
                            role: user.role,
                        };
                    }
                    return null;
                }

                // Register new user if not found
                if (credentials.username.trim() === '') return null;

                const hashedPassword = await hashing(credentials.password);

                try {
                    const newUser = await prisma.users.create({
                        data: {
                            user_email: credentials.email,
                            pass_hash: hashedPassword,
                            user_name: credentials.username,
                            role: 'customer',
                        },
                    });

                    return {
                        id: String(newUser.user_id),
                        name: newUser.user_name,
                        email: newUser.user_email,
                        image: '',
                        role: newUser.role,
                    };
                } catch (error) {
                    console.error('Error creating new user: ', error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: 'openid profile email',
                },
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    role: user.role,
                    id: user.id,
                };
            }
            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                role: token?.role,
                id: token.id,
            };
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            return baseUrl;
        },
        async signIn({ user }) {
            const { email, name, id } = user;

            if (!email || email.trim() === '' || !name || name.trim() === '' || id.trim() === '') return false;

            // Check if the user exists in the database
            const userDatabase = await prisma.users.findFirst({
                where: {
                    user_email: email,
                },
            });

            if (userDatabase) {
                user.role = userDatabase.role;
                user.id = String(userDatabase.user_id);
                user.name = userDatabase.user_name;
                
                await prisma.users.update({
                    where: {
                        user_email: email,
                    },
                    data: {
                        // Update fields if needed
                    },
                });

                return true;
            }

            // Create a new user if not found
            try {
                const newUser = await prisma.users.create({
                    data: {
                        user_email: email,
                        user_name: name,
                        pass_hash: '', // No password for social login
                        role: 'customer',
                    },
                });

                user.role = newUser.role;
                user.id = String(newUser.user_id);

                return true;
            } catch (error) {
                console.error('Error creating new user: ', error);
                return false;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
export const { auth, signIn, signOut } = NextAuth(authOptions);

export const authUserSession = async () => {
    const session = await getServerSession(authOptions);
    return session;
};
