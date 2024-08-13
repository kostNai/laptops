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

type Props = {
    product: ProductType
}

export default function SelectCpu({ product }: Props) {
    const [modelCpu, setModelCpu] = useState('')
    const [isChange, setIsChange] = useState(false)
    const cpuList: CpuType[] = getFilteredData('Cpu')?.cpu_list
    const cpu = cpuList?.find((cpu) => cpu.model === modelCpu)
    const formData: FormData = new FormData()
    if (cpu) {
        formData.append('cpu_id', cpu.id!)
    }
    const editProductWithId = editProduct.bind(
        null,
        product?.id?.toString()!,
        formData
    )
    return (
        <div className="mt-16 grid grid-cols-2 gap-8">
            <div>
                <h3 className="text-2xl font-bold">Процесор:</h3>
                <div>
                    <div>
                        <div className="flex gap-2">
                            <p>{product.cpu?.manufacturer}</p>
                            <p>{product.cpu?.model}</p>
                        </div>
                        <p>Кількість ядер - {product.cpu?.cores_value}</p>
                        <p>Частота - {product.cpu?.frequency}GHz</p>
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
                        <Select onValueChange={(value) => setModelCpu(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Оберіть процесор" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Процесор</SelectLabel>
                                    {cpuList?.map((cpu) => (
                                        <SelectItem
                                            value={cpu.model}
                                            key={cpu.id}
                                        >
                                            {cpu.model}
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
