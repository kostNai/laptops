'use client'

import FadeLoader from 'react-spinners/FadeLoader'
import { getCpuList, getFilteredData } from '@/lib/data'
import { CpuType } from '@/types/CpuType'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/types/ProductType'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}

export default function CpuList({ product, setProduct }: Props) {
    const [cpuList, setCpuList] = useState<CpuType[] | undefined>([])
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

    useEffect(() => {
        setIsLoading(true)
        const res = getFilteredData('Cpu').then((data: any) => {
            try {
                setCpuList(data.data.cpu_list)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        })
    }, [])

    return (
        <div className="mt-8 py-4 px-2 border-t-2  border-solid border-gray-200  border-b-2 ">
            <h3 className="text-xl">Процесор</h3>
            {isLoading ? (
                <FadeLoader />
            ) : (
                <RadioGroup
                    defaultValue="option-one"
                    className="mt-4"
                    onValueChange={(e) => setProduct({ ...product, cpu_id: e })}
                >
                    {cpuList?.map((cpu: CpuType, indx: number) => (
                        <div className="flex items-center space-x-2" key={indx}>
                            <RadioGroupItem value={cpu.id!} id={cpu.id} />
                            <Label
                                htmlFor={cpu.id}
                            >{`${cpu.manufacturer} ${cpu.model}`}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    )
}
