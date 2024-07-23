import { withAuth } from 'next-auth/middleware'

export default withAuth(
	function middleware(req) {},
	{
		callbacks: {
			authorized: ({ req, token }) => {
				const user = token

				const isOnAdminPanel =
					req.nextUrl?.pathname.startsWith(
						'/admin'
					)
				const isOnBlogPage =
					req.nextUrl?.pathname.startsWith(
						'/blog'
					)
				const isOnLoginPage =
					req.nextUrl?.pathname.startsWith(
						'/login'
					)

				if (
					isOnAdminPanel &&
					!user?.isAdmin
				) {
					return false
				}
				if (isOnBlogPage && !user) {
					return false
				}

				if (isOnLoginPage && user) {
					// return Response.redirect(
					// 	new URL('/', req.nextUrl)
					// )
					return false
				}

				return true
			}
		}
	}
)
export const config = {
	matcher: ['/admin']
}
