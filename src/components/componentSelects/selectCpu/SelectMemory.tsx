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
import { MemoryType } from '@/types/MemoryType'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

type Props = {
    product: ProductType
    token: string
    initialState: { message: string; success: boolean }
}

export default function SelectMemory({ product, token, initialState }: Props) {
    const [isChange, setIsChange] = useState(false)
    const [slug, setSlug] = useState('')
    const memoryList: MemoryType[] = getFilteredData('Memory')?.memory_list
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
                <h3 className="text-2xl font-bold">Пам'ять:</h3>
                <div>
                    <div>
                        <div className="flex gap-2">
                            <p>{product.memory?.manufacturer}</p>
                            <p>{product.memory?.type}</p>
                            <p>{product.memory?.size}Gb</p>
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
                            name="memory_id"
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Оберіть пам'ять" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Пам'ять</SelectLabel>
                                    {memoryList?.map((memory) => (
                                        <SelectItem
                                            value={memory.id!.toString()}
                                            key={memory.id}
                                        >
                                            {memory.slug}
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
                <Link href={'/admin/products/add-product/#newCpu'} prefetch>
                    Додати новий
                </Link>
            </div>
        </div>
    )
}
