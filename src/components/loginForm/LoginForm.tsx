'use client'

import { login } from '@/lib/data'
import {
	FormEvent,
	useState
} from 'react'
import {
	signIn,
	signOut,
	useSession
} from 'next-auth/react'

export default function LoginForm() {
	const session = useSession()
	const [user, setUser] = useState({
		username: '',
		password: ''
	})
	const onChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}
	const onSubmitHandler = async (
		e: FormEvent
	) => {
		e.preventDefault()
		// const formData: FormData =
		// 	new FormData()
		// formData.append(
		// 	'username',
		// 	user.username
		// )
		// formData.append(
		// 	'password',
		// 	user.password
		// )
		// const res = await login(
		// 	user.username,
		// 	user.password
		// )
		await signIn('credentials', {
			username: user.username,
			password: user.password,
			redirect: false
		})
	}
	console.log(session)
	const onGitHubAuthHandler =
		async () => {
			const res = await signIn('github')
		}
	return (
		<div>
			<form
				className="flex flex-col w-fit h-fit gap-4 bg-white rounded-xl px-8 py-16 "
				onSubmit={onSubmitHandler}
			>
				<label
					htmlFor="username"
					className="flex gap-4 items-end h-fit p-4"
				>
					Username
					<input
						type="text"
						name="username"
						className="border-b-[1px] border-soli border-gray-700"
						value={user.username}
						onChange={onChangeHandler}
					/>
				</label>

				<label
					htmlFor="password"
					className="flex gap-4"
				>
					Password
					<input
						type="password"
						name="password"
						className="border-b-[1px] border-soli border-gray-700"
						value={user.password}
						onChange={onChangeHandler}
					/>
				</label>
				<button
					// type="submit"
					onClick={onSubmitHandler}
				>
					Login
				</button>
			</form>
			{session && (
				<>
					<div>
						{
							session.data?.user
								?.username
						}
					</div>
					<button
						onClick={
							onGitHubAuthHandler
						}
					>
						Git
					</button>
				</>
			)}
		</div>
	)
}
