import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getMemoryList } from '@/lib/data'
import { DisplayType } from '@/types/DisplayType'
import { MemoryType } from '@/types/MemoryType'
import React, { useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

type Props = {
    memoryId: string
    setMemoryId: (e: string) => void
}

export default function MemoryList({ memoryId, setMemoryId }: Props) {
    const [memoryList, setMemoryList] = useState<MemoryType[] | undefined>([])
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

    useEffect(() => {
        setIsLoading(true)
        const res = getMemoryList().then((data) => {
            try {
                setMemoryList(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        })
    }, [])

    return (
        <div className="8 py-4 px-2   border-solid border-gray-200  border-b-2 ">
            <h3 className="text-xl">Пам'ять</h3>
            {isLoading ? (
                <FadeLoader />
            ) : (
                <RadioGroup
                    defaultValue="option-one"
                    className="mt-4"
                    onValueChange={(e) => setMemoryId(e)}
                >
                    {memoryList?.map((memory) => (
                        <div
                            className="flex items-center space-x-2"
                            key={memory.id}
                        >
                            <RadioGroupItem value={memory.id!} id={memory.id} />
                            <Label
                                htmlFor={memory.id}
                            >{`${memory.manufacturer} ${memory.size}GB ${memory.type}`}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    )
}
