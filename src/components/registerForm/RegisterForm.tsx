'use client'

import { register } from '@/lib/data'
import Link from 'next/link'
import {
	FormEvent,
	useState
} from 'react'

export default function RegisterForm() {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		rePassword: ''
	})

	const onChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const onRegisterHandler = async (
		e: FormEvent
	) => {
		e.preventDefault()
		try {
			const res = await register(
				user.username,
				user.password,
				user.email
			)

			if (res.status === 200) {
				setUser({
					username: '',
					email: '',
					password: '',
					rePassword: ''
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
	const disable =
		user.password !== user.rePassword ||
		!user.email ||
		!user.username ||
		!user.password ||
		!user.rePassword
	return (
		<div className="bg-white  px-16 pb-16 rounded-xl">
			<h2 className="text-xl font-bold text-center mt-8">
				Реєстрація
			</h2>
			<form
				className="flex flex-col w-fit h-fit  gap-8 mt-4"
				onSubmit={onRegisterHandler}
			>
				<div className="flex flex-col w-fit h-fit gap-4">
					<label
						htmlFor="username"
						className="flex gap-8 justify-between items-center"
					>
						Ім'я користувача
						<input
							type="text"
							placeholder="Ім'я користувача"
							className="border-[1px] border-solid border-gray-700 p-2 rounded-lg"
							onChange={onChangeHandler}
							value={user.username}
							name="username"
						/>
					</label>
					<label
						htmlFor="email "
						className="flex gap-8 justify-between items-center"
					>
						Email
						<input
							type="email"
							placeholder="Email"
							className="border-[1px] border-solid border-gray-700 p-2 rounded-lg"
							onChange={onChangeHandler}
							value={user.email}
							name="email"
						/>
					</label>
					<label
						htmlFor="password"
						className="flex gap-8 justify-between items-center"
					>
						Пароль
						<input
							type="password"
							placeholder="Пароль"
							className="border-[1px] border-solid border-gray-700 p-2 rounded-lg"
							onChange={onChangeHandler}
							value={user.password}
							name="password"
						/>
					</label>
					<label
						htmlFor="rePassword"
						className="flex gap-8 justify-between items-center"
					>
						Повторіть пароль
						<input
							type="password"
							placeholder="Повторіть пароль"
							className="border-[1px] border-solid border-gray-700 p-2 rounded-lg"
							onChange={onChangeHandler}
							value={user.rePassword}
							name="rePassword"
						/>
					</label>
				</div>
				<div className="flex gap-4">
					<button
						type="submit"
						className={
							disable
								? 'bg-green-400 text-white py-4 rounded-lg grow transition duration-300 cursor-not-allowed'
								: 'bg-green-400 text-white py-4 rounded-lg grow transition duration-300 hover:bg-green-700'
						}
						disabled={disable}
					>
						Реєстрація
					</button>
					<button
						type="reset"
						className="bg-red-400 text-white py-4 rounded-lg grow transition duration-300 hover:bg-red-700"
					>
						Відмінити
					</button>
				</div>
			</form>
			<Link
				href={'/login'}
				className="text-center w-full inline-block mt-4 underline transition duration-300 hover:text-link-hover-color"
			>
				Вже є акаунт?
			</Link>
		</div>
	)
}
