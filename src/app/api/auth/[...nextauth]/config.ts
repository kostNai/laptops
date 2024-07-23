import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authConfig: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {},
				password: {}
			},

			async authorize(
				credentials,
				req
			) {
				const res = await fetch(
					'http://127.0.0.1:8000/api/login',
					{
						method: 'POST',
						body: JSON.stringify({
							username:
								credentials?.username,
							password:
								credentials?.password
						}),
						headers: {
							'Content-Type':
								'application/json'
						}
					}
				)
				const user = await res.json()

				// If no error and we have user data, return it
				if (res.ok && user) {
					return user.user
				}
				// Return null if user data could not be retrieved
				return null
			}
		})
	],
	pages: {
		signIn: '/login'
	},
	callbacks: {
		async signIn({
			user,
			account,
			profile,
			email,
			credentials
		}) {
			return true
		},
		async redirect({ url, baseUrl }) {
			return baseUrl
		},
		async session({
			session,
			user,
			token
		}) {
			if (token) {
				return {
					...session,
					user: {
						...session.user,
						is_admin: token.is_admin,
						username: token.username
					}
				}
			}
			return session
		},

		async jwt({
			token,
			user,
			account,
			profile
		}) {
			if (user) {
				token.id = user.id
				token.username = user.username
				token.is_admin = user.is_admin
			}
			return token
		}
	}
}
