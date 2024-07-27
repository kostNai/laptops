'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getGraphicList } from '@/lib/data'
import { GraphicType } from '@/types/GraphicType'
import { useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

type Props = {
    graphicId: string
    setGraphicId: (e: string) => void
}

export default function GraphicList({ graphicId, setGraphicId }: Props) {
    const [graphicList, setGraphicList] = useState<GraphicType[] | undefined>(
        []
    )
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

    useEffect(() => {
        setIsLoading(true)
        const res = getGraphicList().then((data) => {
            try {
                setGraphicList(data)
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
                    onValueChange={(e) => setGraphicId(e)}
                >
                    {graphicList?.map((graphic) => (
                        <div
                            className="flex items-center space-x-2"
                            key={graphic.id}
                        >
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
