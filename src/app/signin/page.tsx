'use client'

import Link from 'next/link'
import {
	FormEventHandler,
	useState
} from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

export default function SigninPage() {
	const [user_login, setUserLogin] =
		useState<string>('')
	const [password, setPassword] =
		useState<string>('')
	const [errorsList, setErrorsList] =
		useState<string[] | undefined>([])
	const [isLogin, setIsLogin] =
		useState<boolean>(false)
	const [
		successRegister,
		SetSuccessRegister
	] = useState<boolean>(false)
	const router = useRouter()

	// const { expiresIn, accessToken, refreshToken } = req.body;

	// const cookieObj = {
	//   expiresIn,
	//   accessToken,
	//   refreshToken,
	// };

	// res.setHeader(
	//   "Set-Cookie",
	//   cookie.serialize(TOKEN_NAME, JSON.stringify(cookieObj), {
	// 	httpOnly: true,
	// 	secure: process.env.NODE_ENV !== "development",
	// 	maxAge: expiresIn,
	// 	sameSite: "strict",
	// 	path: "/",
	//   })
	// );
	// res.status(200).json({ success: true });

	const onSubmitHandler: FormEventHandler<
		HTMLFormElement
	> = async (e) => {
		e.preventDefault()
		setErrorsList(
			errorsList?.splice(
				0,
				errorsList.length
			)
		)
		const res = await signIn(
			'credentials',
			{
				username: user_login,
				password: password,
				redirect: false
			}
		)
		console.log('res')
		console.log(res)

		if (res && !res.error) {
			router.push('/')
		} else {
			const errors = JSON.parse(
				res?.error as string
			)
			const arrayErrors = errors.errors
			if (
				typeof arrayErrors === 'string'
			) {
				setErrorsList([
					...(errorsList as string[]),
					arrayErrors
				])
			} else {
				setErrorsList([
					...(errorsList as string[]),
					...arrayErrors
				])
			}
		}
	}
	const onGoogleAuthHandler =
		async () => {
			const res = await signIn('google')
			if (res && !res.error) {
				router.push('/user-profile')
			}
		}

	return (
		<div className="flex items-center flex-col my-8 gap-8">
			<h2 className="text-2xl text-red-600 font-bold">
				Вхід
			</h2>
			<form
				className="flex flex-col gap-4"
				onSubmit={onSubmitHandler}
			>
				<input
					type="text"
					placeholder="Логін"
					value={user_login}
					onChange={(e) =>
						setUserLogin(e.target.value)
					}
				/>
				<input
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) =>
						setPassword(e.target.value)
					}
				/>
				<ul>
					{Array.isArray(errorsList) ? (
						errorsList.map(
							(error, i) => (
								<li
									className="text-xs text-red-700"
									key={i}
								>
									{error}
								</li>
							)
						)
					) : (
						<li className="text-xs text-red-700">
							{errorsList}
						</li>
					)}
				</ul>
				<button
					className="bg-red-600 text-white py-2 rounded-full hover:bg-red-800 transition duration-300"
					disabled={isLogin}
				>
					Увійти
				</button>
			</form>
			<p className="font-bold">або</p>
			<button
				className="mt-2 py-2 px-2 rounded-full flex justify-center items-center gap-4 border-solid border-2 transition text-gray-600 duration-300 hover:border-black"
				onClick={onGoogleAuthHandler}
			>
				Увійти за допомогою{' '}
				<FcGoogle className="w-6 h-6" />
			</button>
			<div className="flex flex-col items-center"></div>
			<p className="text-gray-700">
				Немає акаунту?
				<Link
					href={'register'}
					className="mx-2 underline"
				>
					Зареєструвати
				</Link>
			</p>
		</div>
	)
}
