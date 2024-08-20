'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem
} from '@/components/ui/select'
import { ProductType } from '@/types/ProductType'
import { editProduct } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { getFilteredData, mutateData } from '@/lib/fetcher'
import { GraphicType } from '@/types/GraphicType'
import { toast } from 'sonner'
import { useFormState } from 'react-dom'

type Props = {
    product: ProductType
    token: string
    initialState: { message: string; success: boolean; token: string }
    updateSession: (token: string) => void
}

export default function SelectGraphic({
    product,
    token,
    initialState,
    updateSession
}: Props) {
    const [slug, setSlug] = useState('')
    const [isChange, setIsChange] = useState(false)
    const graphicList: GraphicType[] = getFilteredData('Graphic')?.graphic_list
    const editProductWithId = editProduct.bind(
        null,
        product?.id?.toString()!,
        token
    )
    const [state, formAction] = useFormState(editProductWithId, initialState)
    useEffect(() => {
        if (state.message && !state.success) toast.error(state.message)
        if (state.message && state.success) {
            toast.success(state.message)
            setSlug('')
        }
        updateSession(state.token)
        mutateData(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`)
    }, [state])
    return (
        <div className="mt-16 grid grid-cols-2 gap-8">
            <div>
                <h3 className="text-2xl font-bold">Графіка:</h3>
                <div>
                    <div>
                        <div className="flex gap-2">
                            <p>{product.graphic?.manufacturer}</p>
                            <p>{product.graphic?.model}</p>
                            <p>{product.graphic?.series}</p>
                            <p>{product.graphic?.type}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-16 items-center">
                {!isChange ? (
                    <Button variant="primary" onClick={() => setIsChange(true)}>
                        Змінити
                    </Button>
                ) : (
                    <form action={formAction}>
                        <Select
                            onValueChange={setSlug}
                            value={slug}
                            name="graphic_id"
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Оберіть графіку" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Графіка</SelectLabel>
                                    {graphicList?.map((graphic) => (
                                        <SelectItem
                                            value={graphic.id!.toString()}
                                            key={graphic.id}
                                        >
                                            {graphic.slug}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="link"
                            type="submit"
                            className="text-link-hover-color"
                        >
                            Змінити
                        </Button>
                    </form>
                )}
                <Link href={'/admin/products/add-product/#newGraphic'} prefetch>
                    Додати новий
                </Link>
            </div>
        </div>
    )
}
