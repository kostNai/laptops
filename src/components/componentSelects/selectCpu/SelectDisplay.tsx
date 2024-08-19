'use client'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { toast } from 'sonner'
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
import { DisplayType } from '@/types/DisplayType'

type Props = {
    product: ProductType
    token: string
    initialState: { message: string; success: boolean }
}
export default function SelectDisplay({ product, token, initialState }: Props) {
    const [slug, setSlug] = useState('')
    const [isChange, setIsChange] = useState(false)
    const displayList: DisplayType[] = getFilteredData('Display')?.display_list

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
        mutateData(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`)
    }, [state])

    return (
        <div className="mt-16 grid grid-cols-2 gap-8">
            <div>
                <h3 className="text-2xl font-bold">Дисплей:</h3>
                <div>
                    <div>
                        <div className="flex gap-2">
                            <p>{product.display?.cover}</p>
                            <p>{product.display?.matrix}</p>
                            <p>{product.display?.resolution}px</p>
                            <p>{product.display?.size}"</p>
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
                            name="display_id"
                            value={slug}
                            onValueChange={setSlug}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Оберіть дисплей" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Дисплей</SelectLabel>
                                    {displayList?.map((display) => (
                                        <SelectItem
                                            value={display?.id!.toString()}
                                            defaultValue={''}
                                            key={display.id}
                                        >
                                            {display.slug}
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
                <Link href={'/admin/products/add-product/#newDisplay'} prefetch>
                    Додати новий
                </Link>
            </div>
        </div>
    )
}
