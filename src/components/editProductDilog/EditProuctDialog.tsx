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

type Props = {
    title: string
    propName: string
    defaultValue: string
    product: ProductType
}

export default function EditProuctDialog({
    title,
    propName,
    defaultValue,
    product
}: Props) {
    const editProductWithId = editProduct.bind(null, product.id?.toString()!)

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
                <form
                    action={editProductWithId}
                    className="flex flex-col gap-2"
                >
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
