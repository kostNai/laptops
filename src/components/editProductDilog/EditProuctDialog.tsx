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
import { editProduct } from '@/lib/actions'
import { ProductType } from '@/types/ProductType'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useSession } from 'next-auth/react'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { mutateData } from '@/lib/fetcher'

type Props = {
    title: string
    propName: string
    defaultValue: string
    product: ProductType
    updateSession: (token: string) => void
}
const initialState = { message: '', success: false, token: '' }

export default function EditProuctDialog({
    title,
    propName,
    defaultValue,
    product,
    updateSession
}: Props) {
    const session = useSession()
    const token = session.data?.user?.access_token

    const editProductWithId = editProduct.bind(
        null,
        product.id?.toString()!,
        token!
    )
    const [state, formAction] = useFormState(editProductWithId, initialState)
    useEffect(() => {
        if (!state.success && state.message) toast.error(state.message)
        if (state.success && state.message) toast.success(state.message)
        updateSession(state.token)
        mutateData(`http://127.0.0.1:8000/api/products/${product.id}`)
    }, [state])
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="link" className="text-link-hover-color p-0">
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
                        <Input name={propName} defaultValue={defaultValue} />
                    </Label>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
