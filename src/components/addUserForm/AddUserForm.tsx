'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useFormState } from 'react-dom'
import { addUser } from '@/lib/actions'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { mutateData } from '@/lib/fetcher'
import { redirect } from 'next/navigation'

const initialState = {
    message: '',
    success: false,
    token: '',
    statusCode: 200,
    path: ''
}

export default function AddUserForm() {
    const { data: session, status, update } = useSession()
    const token = session?.user?.access_token

    const addUserWithToken = addUser.bind(null, token!)

    const [state, formAction] = useFormState(addUserWithToken, initialState)

    const updateSession = (access_token: string) => {
        update({ access_token })
    }
    useEffect(() => {
        console.log(state)
        state.message && !state.success ? toast.error(state.message) : false
        state.success && toast.success(state.message)
        updateSession(state.token)
        mutateData(`http://localhost:3000/api/users`)
        if (state.statusCode === 401) {
            signOut()
            redirect('/login')
        }
    }, [state])
    return (
        <form action={formAction} className="w-full mt-8">
            <div className="w-1/3 flex flex-col gap-4 ">
                <div className="flex flex-col gap-6 [&>*:nth-child(n)]:flex [&>*:nth-child(n)]:flex-col [&>*:nth-child(n)]:gap-2">
                    <Label>
                        Ім'я
                        <Input placeholder="Ім'я" name="name" />
                    </Label>
                    <Label>
                        Логін
                        <Input
                            placeholder="Логін"
                            name="username"
                            className={
                                state.path === 'username'
                                    ? 'border-red-600'
                                    : ''
                            }
                        />
                        {state.path === 'username' && (
                            <p className="text-xs text-red-600">
                                {state.message}
                            </p>
                        )}
                    </Label>
                    <Label>
                        Email
                        <Input
                            type="email"
                            placeholder="email"
                            name="email"
                            className={
                                state.path === 'email' ? 'border-red-600 ' : ''
                            }
                        />
                        {state.path === 'email' && (
                            <p className="text-xs text-red-600">
                                {state.message}
                            </p>
                        )}
                    </Label>
                    <Label>
                        Пароль
                        <Input
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            className={
                                state.path === 'password'
                                    ? 'border-red-600'
                                    : ''
                            }
                        />
                        {state.path === 'password' && (
                            <p className="text-xs text-red-600">
                                {state.message}
                            </p>
                        )}
                    </Label>
                </div>
                <div className="flex w-full gap-4">
                    <Button variant="success" type="submit" className="w-full">
                        Додати
                    </Button>
                    <Button
                        variant="destructive"
                        type="reset"
                        className="w-full"
                    >
                        Відмінити
                    </Button>
                </div>
            </div>
        </form>
    )
}
