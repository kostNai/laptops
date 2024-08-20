'use client'

import { ProductType } from '@/types/ProductType'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { editProduct } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { mutateData } from '@/lib/fetcher'

type Props = {
    product: ProductType
    token: string
    initialState: { message: string; success: boolean; token: string }
    updateSession: (token: string) => void
}

export default function ProductImage({
    product,
    token,
    initialState,
    updateSession
}: Props) {
    const [isImageChange, setIsImageChange] = useState(false)
    const fileRef = useRef<HTMLInputElement>(null)
    const [disable, setDisable] = useState(false)
    const editProductWithId = editProduct.bind(
        null,
        product?.id?.toString()!,
        token!
    )
    // fileRef.current?.files?.length ? setDisable(true) : setDisable(false)
    const [state, formAction] = useFormState(editProductWithId, initialState)
    useEffect(() => {
        if (state.message && !state.success) toast.error(state.message)
        if (state.message && state.success) {
            toast.success(state.message)
        }
        updateSession(state.token)
        mutateData(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`)
    }, [state])
    return (
        <div className="flex flex-col gap-4 items-start border-b-[1px] border-gray-200 border-solid">
            <div className="w-fit h-fit mt-16  border-[1px] border-gray-300 border-solid p-4 rounded-xl inline-block ">
                <Image
                    src={product.image ? product.image : '/test-card-image.png'}
                    alt="product image"
                    width={300}
                    height={200}
                />
            </div>

            {!isImageChange && (
                <Button
                    variant="outline"
                    className="mb-8"
                    onClick={() => setIsImageChange(true)}
                >
                    Змінити зображення
                </Button>
            )}
            {isImageChange && (
                <form
                    className="flex flex-col gap-2 items-start mb-8"
                    action={formAction}
                >
                    <Label
                        htmlFor="product_img"
                        className="flex flex-col gap-1 text-lg"
                    >
                        Змінити
                    </Label>
                    <Input name="product_img" type="file" ref={fileRef} />
                    <div className="flex gap-2">
                        <Button
                            variant="success"
                            type="submit"
                            // disabled={!disable}
                        >
                            Підтвердити
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setIsImageChange(false)}
                        >
                            Відмінити
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}
