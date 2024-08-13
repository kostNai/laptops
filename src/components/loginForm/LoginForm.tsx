'use client'

import { FormEvent, useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const session = useSession()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const router = useRouter()
    useEffect(() => {
        if (session.status === 'authenticated') {
            setUser({
                username: '',
                password: ''
            })
            router.push('/')
        }
    }, [session.status])
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        await signIn('credentials', {
            username: user.username,
            password: user.password,
            redirect: false
        })
    }
    return (
        <div className="bg-white  px-16 pb-16 rounded-xl mt-32">
            <h2 className="text-xl font-bold text-center mt-8">Вхід</h2>
            <form
                className="flex flex-col w-fit h-fit  gap-8 mt-4"
                onSubmit={onSubmitHandler}
            >
                <div>
                    <label
                        htmlFor="username"
                        className="flex gap-4 items-end h-fit "
                    >
                        Логін
                    </label>
                    <input
                        type="text"
                        name="username"
                        className="border-[1px] border-solid border-gray-700 p-2 rounded-lg"
                        value={user.username}
                        onChange={onChangeHandler}
                        placeholder="логін"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="flex gap-4">
                        Пароль
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="border-[1px] border-solid border-gray-700 p-2 rounded-lg"
                        value={user.password}
                        onChange={onChangeHandler}
                        placeholder="пароль"
                    />
                </div>
                <button
                    // type="submit"
                    onClick={onSubmitHandler}
                    className="bg-header-bg text-white py-4 rounded-lg"
                >
                    Вхід
                </button>
            </form>
        </div>
    )
}
