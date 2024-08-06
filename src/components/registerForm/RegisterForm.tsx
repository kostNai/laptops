'use client'

import { register } from '@/lib/actions'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { RedirectType, redirect } from 'next/navigation'

const initialState = { message: '', path: '', success: false }
export default function RegisterForm() {
    const [state, formAction] = useFormState(register, initialState)

    useEffect(() => {
        state.success && redirect('/login', RedirectType.replace)
        state.success && toast.success('Реєстрація успішна')
        state.message && toast.error('Помилка реєстрації')
    }, [state])

    return (
        <div className="bg-white  px-16 pb-16 rounded-xl mt-16">
            <h2 className="text-xl font-bold text-center mt-8">Реєстрація</h2>
            <form
                className="flex flex-col w-fit h-fit  gap-8 mt-4 "
                action={formAction}
            >
                <div className="flex flex-col w-fit h-fit gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
                    <div>
                        <Label
                            htmlFor="username"
                            className="flex gap-8 justify-between items-center"
                        >
                            Ім'я користувача
                        </Label>
                        {state.path === 'username' && (
                            <p className="text-xs text-red-600">
                                {state.message}
                            </p>
                        )}
                        <Input
                            type="text"
                            placeholder="Ім'я користувача"
                            name="username"
                            className={
                                state.message && state.path === 'username'
                                    ? 'placeholder:text-red-400 border-red-600'
                                    : ''
                            }
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="email "
                            className="flex gap-8 justify-between items-center"
                        >
                            Email
                        </Label>
                        {state.path === 'email' && (
                            <p className="text-xs text-red-600">
                                {state.message}
                            </p>
                        )}
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className={
                                state.message && state.path === 'email'
                                    ? 'placeholder:text-red-400 border-red-600'
                                    : ''
                            }
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="password"
                            className="flex gap-8 justify-between items-center"
                        >
                            Пароль
                        </Label>

                        {state.path === 'password' && (
                            <p className="text-xs text-red-600">
                                {state.message}
                            </p>
                        )}
                        <Input
                            type="password"
                            placeholder="Пароль"
                            className={
                                state.message && state.path === 'password'
                                    ? 'placeholder:text-red-400 border-red-600'
                                    : ''
                            }
                            name="password"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="confirmPassword"
                            className="flex gap-8 justify-between items-center"
                        >
                            Повторіть пароль
                        </Label>
                        {state.path === 'confirmPassword' && (
                            <p className="text-xs text-red-600">
                                {state.message}
                            </p>
                        )}
                        <Input
                            className={
                                state.message &&
                                state.path === 'confirmPassword'
                                    ? 'placeholder:text-red-400 border-red-600'
                                    : ''
                            }
                            type="password"
                            placeholder="Повторіть пароль"
                            name="confirmPassword"
                        />
                    </div>
                </div>
                {state.message && !state.path ? (
                    <p className="text-xs text-red-600">{state.message}</p>
                ) : (
                    false
                )}
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
