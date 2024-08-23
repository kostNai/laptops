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
import { mutateData } from '@/lib/fetcher'
import { useSession } from 'next-auth/react'

type Props = {
    title: string
    propName: string
    defaultValue: string
    user: UserType
}
const initialState = { message: '', success: false, token: '' }

export default function FileDialog({
    title,
    propName,
    defaultValue,
    user
}: Props) {
    const { data: session, status, update } = useSession()
    const token = session?.user?.access_token
    const updateUserWithId = editUser.bind(null, user.id?.toString()!, token!)

    const [state, formAction] = useFormState(updateUserWithId, initialState)

    useEffect(() => {
        state.message && !state.success ? toast.error(state.message) : false
        state.success && toast.success(state.message)
        update({ access_token: state.token })
        mutateData(`http://127.0.0.1:8000/api/users/${user.id}`)
    }, [state])

    return (
        <div className="max-sm:ml-4">
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
                            Оберіть файл
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
                                type="file"
                                className="w-fit"
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
