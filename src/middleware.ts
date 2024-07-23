import NextAuth from 'next-auth'
import { authConfig } from './app/api/auth/[...nextauth]/config'

export default NextAuth(authConfig).auth

export const config = {
	matcher: [
		'/((?!api|static|.*\\..*|_next).*)'
	]
}
