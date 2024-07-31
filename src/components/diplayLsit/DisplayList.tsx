'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getDisplayList, getFilteredData } from '@/lib/data'
import { DisplayType } from '@/types/DisplayType'
import { ProductType } from '@/types/ProductType'
import { useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}
const filteredOptions = (options: any) => {
    return Array.from(new Set(options))
}
export default function DisplayList({ product, setProduct }: Props) {
    const [displayList, setDisplayList] = useState<DisplayType[] | undefined>(
        []
    )
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

    useEffect(() => {
        setIsLoading(true)
        const res = getFilteredData('Display').then((data: any) => {
            try {
                setDisplayList(data.data.display_list)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        })
    }, [])

    return (
        <div className="8 py-4 px-2   border-solid border-gray-200  border-b-2 ">
            <h3 className="text-xl">Дисплей</h3>
            {isLoading ? (
                <FadeLoader />
            ) : (
                <RadioGroup
                    defaultValue="option-one"
                    className="mt-4"
                    onValueChange={(e) =>
                        setProduct({ ...product, display_id: e })
                    }
                >
                    {displayList?.length &&
                        displayList.map(
                            (display: DisplayType, indx: number) => (
                                <div
                                    className="flex items-center space-x-2"
                                    key={indx}
                                >
                                    <RadioGroupItem
                                        value={display.id!}
                                        id={display.id}
                                    />
                                    <Label
                                        htmlFor={display.id}
                                    >{`${display.matrix} ${display.resolution} ${display.size}"`}</Label>
                                </div>
                            )
                        )}
                </RadioGroup>
            )}
        </div>
    )
}
