'use client'

import { register } from '@/lib/actions'
// import { register } from '@/lib/data'
// import { FormEvent, useState } from 'react'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const initialState = { message: '' }
export default function RegisterForm() {
    const [state, formAction] = useFormState(register, initialState)
    console.log(state.message)
    // const [user, setUser] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    //     rePassword: ''
    // })

    // const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setUser({
    //         ...user,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const onRegisterHandler = async (e: FormEvent) => {
    //     e.preventDefault()
    //     try {
    //         const res = await register(user.username, user.password, user.email)

    //         if (res.status === 200) {
    //             setUser({
    //                 username: '',
    //                 email: '',
    //                 password: '',
    //                 rePassword: ''
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // const disable =
    //     user.password !== user.rePassword ||
    //     !user.email ||
    //     !user.username ||
    //     !user.password ||
    //     !user.rePassword
    return (
        <div className="bg-white  px-16 pb-16 rounded-xl mt-16">
            <h2 className="text-xl font-bold text-center mt-8">Реєстрація</h2>
            <form
                className="flex flex-col w-fit h-fit  gap-8 mt-4 "
                action={formAction}
                // onSubmit={onRegisterHandler}
            >
                <div className="flex flex-col w-fit h-fit gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
                    <div>
                        <Label
                            htmlFor="username"
                            className="flex gap-8 justify-between items-center"
                        >
                            Ім'я користувача
                        </Label>
                        <Input
                            type="text"
                            placeholder="Ім'я користувача"
                            name="username"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="email "
                            className="flex gap-8 justify-between items-center"
                        >
                            Email
                        </Label>
                        <Input type="email" placeholder="Email" name="email" />
                    </div>
                    <div>
                        <Label
                            htmlFor="password"
                            className="flex gap-8 justify-between items-center"
                        >
                            Пароль
                        </Label>
                        <Input
                            type="password"
                            placeholder="Пароль"
                            name="password"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="rePassword"
                            className="flex gap-8 justify-between items-center"
                        >
                            Повторіть пароль
                        </Label>
                        <Input
                            type="password"
                            placeholder="Повторіть пароль"
                            name="rePassword"
                        />
                    </div>
                </div>
                <div className="flex gap-4 ">
                    <Button type="submit">Реєстрація</Button>
                    <Button type="reset">Відмінити</Button>
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
