import type { AuthOptions, Awaitable } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authConfig: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {},
                password: {}
            },

            async authorize(credentials, req) {
                const res = await fetch('http://127.0.0.1:8000/api/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const user = await res.json()

                if (res.ok && user) {
                    return {
                        ...user,
                        access_token: user.access_token
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },

        async redirect({ url, baseUrl }) {
            return baseUrl
        },

        async session({ session, user, token }) {
            if (token) {
                session!.user!.is_admin = token.is_admin
                session!.user!.username = token.username
                session!.user!.img = token.img
                session!.user!.name = token.name
                session!.user!.access_token = token.access_token
            }

            return session
        },

        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update' && session.access_token) {
                token.access_token = session.access_token
            }
            if (user) {
                token.id = user.user.id
                token.username = user.user.username
                token.is_admin = user.user.is_admin
                token.img = user.user.img
                token.name = user.user.name
                token.access_token = user.access_token
                return token
            }

            return token
        }
    },
    session: {
        strategy: 'jwt'
    }
}
