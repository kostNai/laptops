'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getRamList } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import { RamType } from '@/types/RamType'
import { useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}

export default function RamList({ product, setProduct }: Props) {
    const [ramList, setRamList] = useState<RamType[] | undefined>([])
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

    useEffect(() => {
        setIsLoading(true)
        const res = getRamList().then((data) => {
            try {
                setRamList(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        })
    }, [])

    return (
        <div className="8 py-4 px-2   border-solid border-gray-200  border-b-2 ">
            <h3 className="text-xl">ОЗУ</h3>
            {isLoading ? (
                <FadeLoader />
            ) : (
                <RadioGroup
                    defaultValue="option-one"
                    className="mt-4"
                    onValueChange={(e) => setProduct({ ...product, ram_id: e })}
                >
                    {ramList?.map((ram) => (
                        <div
                            className="flex items-center space-x-2"
                            key={ram.id}
                        >
                            <RadioGroupItem value={ram.id!} id={ram.id} />
                            <Label
                                htmlFor={ram.id}
                            >{`${ram.manufacturer} ${ram.memory}GB`}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    )
}
