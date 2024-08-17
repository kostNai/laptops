import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { addNewMemory } from '@/lib/data'
import { MemoryType } from '@/types/MemoryType'
import { ProductType } from '@/types/ProductType'
import React, { FormEvent, useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'

import { toast } from 'sonner'
import { getFilteredData, revalidate } from '@/lib/fetcher'
import ComponentDilog from '../componentDilog/ComponentDilog'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
    id: string
}

const MAX_LIMIT_CHARACTERISTICS = 4

const DIALOG_FIELDS = [
    { title: 'Виробник', name: 'manufacturer' },
    { title: 'Тип', name: 'type' },
    { title: "Об'єм", name: 'size' }
]

export default function MemoryList({ product, setProduct, id }: Props) {
    const memoryList = getFilteredData('Memory')?.memory_list

    const [newMemory, setNewMemory] = useState<MemoryType | null>(null)
    const [open, setOpen] = useState(false)
    const [getMore, setGetMore] = useState<boolean>()
    const [defaultFields, setDefaultFields] = useState<MemoryType[]>()
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()

    const token = session.data?.user?.access_token
    const slug = `${newMemory?.manufacturer}_${newMemory?.type}_${newMemory?.size}`

    useEffect(() => {
        if (memoryList) {
            getMore
                ? setDefaultFields(memoryList)
                : setDefaultFields(
                      memoryList.slice(0, MAX_LIMIT_CHARACTERISTICS)
                  )

            setIsLoading(false)
        }
    }, [getMore, memoryList])

    const onChangeHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMemory({ ...newMemory!, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (token && newMemory) {
            try {
                const res = await addNewMemory({ ...newMemory, slug }, token)
                if (res.status === 200) {
                    toast.success('Додано успішно')
                    revalidate('Memory')
                    setOpen(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div
            className="8 py-4 px-2   border-solid border-gray-200  border-b-2 "
            id={id}
        >
            <div>
                <h3 className="text-xl font-bold">Пам'ять</h3>
                {isLoading ? (
                    <FadeLoader />
                ) : (
                    <RadioGroup
                        defaultValue="option-one"
                        className="mt-4"
                        onValueChange={(e) =>
                            setProduct({ ...product, memory_id: e })
                        }
                        name="memory_id"
                    >
                        {defaultFields?.map(
                            (memory: MemoryType, indx: number) => (
                                <div
                                    className="flex items-center space-x-2"
                                    key={indx}
                                >
                                    <RadioGroupItem
                                        value={memory.id!}
                                        id={memory.id}
                                    />
                                    <Label
                                        htmlFor={memory.id}
                                    >{`${memory.manufacturer} ${memory.size}GB ${memory.type}`}</Label>
                                </div>
                            )
                        )}
                    </RadioGroup>
                )}
                {memoryList?.length! > MAX_LIMIT_CHARACTERISTICS && (
                    <Button
                        variant="link"
                        onClick={() => setGetMore(!getMore)}
                        type="button"
                        className="text-link-hover-color"
                    >
                        Показати більше
                    </Button>
                )}
            </div>
            <ComponentDilog
                open={open}
                title="Пам'ять"
                componentFields={DIALOG_FIELDS}
                onSubmitHandler={onSubmitHandler}
                onChangeHanler={onChangeHanler}
                setOpen={setOpen}
            />
        </div>
    )
}
