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
import { CpuType } from '@/types/CpuType'
import { ProductType } from '@/types/ProductType'
import { editProduct } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { getFilteredData, mutateData } from '@/lib/fetcher'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

type Props = {
    product: ProductType
    token: string
    initialState: { message: string; success: boolean }
}

export default function SelectCpu({ product, token, initialState }: Props) {
    const [modelCpu, setModelCpu] = useState('')
    const [isChange, setIsChange] = useState(false)
    const cpuList: CpuType[] = getFilteredData('Cpu')?.cpu_list
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
            setModelCpu('')
        }
        mutateData(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`)
    }, [state])
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
                    <form action={formAction}>
                        <Select
                            onValueChange={setModelCpu}
                            value={modelCpu}
                            name="cpu_id"
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Оберіть процесор" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Процесор</SelectLabel>
                                    {cpuList?.map((cpu) => (
                                        <SelectItem
                                            value={cpu.id?.toString()!}
                                            defaultValue={''}
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
