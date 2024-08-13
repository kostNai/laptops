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
import { CpuType } from '@/types/CpuType'
import { ProductType } from '@/types/ProductType'
import { editProduct } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { getFilteredData, mutateData } from '@/lib/fetcher'
import { RamType } from '@/types/RamType'

type Props = {
    product: ProductType
}

export default function SelectRam({ product }: Props) {
    const [slug, setSlug] = useState('')
    const [isChange, setIsChange] = useState(false)
    const ramList: RamType[] = getFilteredData('Ram')?.ram_list
    const ram = ramList?.find((ram) => ram.slug === slug)
    const formData: FormData = new FormData()
    if (ram) {
        formData.append('ram_id', ram.id!)
    }
    const editProductWithId = editProduct.bind(
        null,
        product?.id?.toString()!,
        formData
    )
    return (
        <div className="mt-16 grid grid-cols-2 gap-8">
            <div>
                <h3 className="text-2xl font-bold">ОЗУ:</h3>
                <div>
                    <div>
                        <div className="flex gap-2">
                            <p>{product.ram?.manufacturer}</p>
                            <p>{product.ram?.type}</p>
                            <p>{product.ram?.memory} Гб</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-16 items-center">
                {!isChange ? (
                    <Button
                        variant="primary"
                        onClick={() => setIsChange(true)}
                        className="w-fit"
                    >
                        Змінити
                    </Button>
                ) : (
                    <form action={editProductWithId}>
                        <Select onValueChange={(value) => setSlug(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Оберіть ОЗУ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Процесор</SelectLabel>
                                    {ramList?.map((ram) => (
                                        <SelectItem
                                            value={ram.slug}
                                            key={ram.id}
                                        >
                                            {ram.slug}
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
