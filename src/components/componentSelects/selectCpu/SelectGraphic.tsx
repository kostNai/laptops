'use client'

import { useState } from 'react'
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
import { getFilteredData } from '@/lib/fetcher'
import { GraphicType } from '@/types/GraphicType'

type Props = {
    product: ProductType
}

export default function SelectGraphic({ product }: Props) {
    const [slug, setSlug] = useState('')
    const [isChange, setIsChange] = useState(false)
    const graphicList: GraphicType[] = getFilteredData('Graphic')?.graphic_list
    const graphic = graphicList?.find((graphic) => graphic.slug === slug)
    const formData: FormData = new FormData()
    if (graphic) {
        formData.append('graphic_id', graphic.id!)
    }
    const editProductWithId = editProduct.bind(
        null,
        product?.id?.toString()!,
        formData
    )
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
                    <form action={editProductWithId}>
                        <Select onValueChange={(value) => setSlug(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Оберіть графіку" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Графіка</SelectLabel>
                                    {graphicList?.map((graphic) => (
                                        <SelectItem
                                            value={graphic.slug}
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
