'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getFilteredData, getGraphicList } from '@/lib/data'
import { GraphicType } from '@/types/GraphicType'
import { ProductType } from '@/types/ProductType'
import { useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}

export default function GraphicList({ product, setProduct }: Props) {
    const [graphicList, setGraphicList] = useState<GraphicType[] | undefined>(
        []
    )
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

    useEffect(() => {
        setIsLoading(true)
        const res = getFilteredData('Graphic').then((data: any) => {
            try {
                setGraphicList(data.data.graphic_list)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        })
    }, [])

    return (
        <div className="8 py-4 px-2   border-solid border-gray-200  border-b-2 ">
            <h3 className="text-xl">Графіка</h3>
            {isLoading ? (
                <FadeLoader />
            ) : (
                <RadioGroup
                    defaultValue="option-one"
                    className="mt-4"
                    onValueChange={(e) =>
                        setProduct({ ...product, graphic_id: e })
                    }
                >
                    {graphicList?.map((graphic: GraphicType, indx: number) => (
                        <div className="flex items-center space-x-2" key={indx}>
                            <RadioGroupItem
                                value={graphic.id!}
                                id={graphic.id}
                            />
                            <Label
                                htmlFor={graphic.id}
                            >{`${graphic.manufacturer} ${graphic.series} ${graphic.model} `}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    )
}
