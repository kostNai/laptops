'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { editUser } from '@/lib/actions'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UserType } from '@/types'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    title: string
    propName: string
    defaultValue: string
    user: UserType
}

const initialState = { message: '' }

export default function EditUserDialog({
    title,
    propName,
    defaultValue,
    user
}: Props) {
    const updateUserWithId = editUser.bind(null, user.id?.toString()!)

    const [error, setError] = useState('')
    const [state, formAction] = useFormState(updateUserWithId, initialState)

    useEffect(() => {
        if (state.message) {
            Z
            setError(state.message)
            toast.error(error)
        }
    }, [state])

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="link"
                        className="text-link-hover-color p-0"
                    >
                        Змінити
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            Введіть нові дані
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form action={formAction} className="flex flex-col gap-2">
                        <Label
                            htmlFor={propName}
                            className="flex gap-4 items-center"
                        >
                            <span className="text-lg font-bold">{title}</span>
                            <Input
                                name={propName}
                                defaultValue={defaultValue}
                            />
                        </Label>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Відмінити</AlertDialogCancel>
                            <AlertDialogAction type="submit">
                                Підтвердити
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
