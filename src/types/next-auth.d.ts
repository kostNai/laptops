import {
	DefaultSession,
	DefaultUser
} from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user?: {
			username: string
			is_admin: boolean
		} & DefaultSession['user']
	}
	interface User {
		username: string
		is_admin: boolean &
			DefaultUser['user']
	}
}
declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		username: string
		is_admin: boolean
	}
}
