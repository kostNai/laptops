'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CpuType } from '@/types/CpuType'
import { addNewCpu } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import { Button } from '@/components/ui/button'
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
    { title: 'Модель', name: 'model' },
    { title: 'Серія', name: 'series' },
    { title: 'Кількість ядер', name: 'cores_value' },
    { title: 'Частота', name: 'frequency' }
]
export default function CpuList({ product, setProduct, id }: Props) {
    const cpuList = getFilteredData('Cpu')?.cpu_list

    const [newCpu, setNewCpu] = useState<CpuType | null>(null)
    const [open, setOpen] = useState(false)
    const [getMore, setGetMore] = useState<boolean>()
    const [defaultFields, setDefaultFields] = useState<CpuType[]>()
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()

    const token = session.data?.user?.access_token
    const slug = `${newCpu?.model}_${newCpu?.series}_${newCpu?.cores_value}`

    useEffect(() => {
        if (cpuList) {
            getMore
                ? setDefaultFields(cpuList)
                : setDefaultFields(cpuList.slice(0, MAX_LIMIT_CHARACTERISTICS))

            setIsLoading(false)
        }
    }, [getMore, cpuList])

    const onChangeHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCpu({ ...newCpu!, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (token && newCpu) {
            try {
                const res = await addNewCpu({ ...newCpu, slug: slug }, token)
                if (res.status === 200) {
                    toast.success('Додано успішно')
                    revalidate('Cpu')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div
            className="mt-8 py-4 px-2 border-t-2  border-solid border-gray-200  border-b-2 "
            id={id}
        >
            <div>
                <h3 className="text-xl">Процесор</h3>
                {isLoading ? (
                    <FadeLoader />
                ) : (
                    <RadioGroup
                        defaultValue="option-one"
                        className="mt-4"
                        onValueChange={(e) =>
                            setProduct({ ...product, cpu_id: e })
                        }
                        name="cpu_id"
                    >
                        {defaultFields?.map((cpu: CpuType, indx: number) => (
                            <div
                                className="flex items-center space-x-2"
                                key={indx}
                            >
                                <RadioGroupItem value={cpu.id!} id={cpu.id} />
                                <Label
                                    htmlFor={cpu.id}
                                >{`${cpu.manufacturer} ${cpu.model}`}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
                {cpuList?.length! > MAX_LIMIT_CHARACTERISTICS && (
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
                title="Процесор"
                componentFields={DIALOG_FIELDS}
                onSubmitHandler={onSubmitHandler}
                onChangeHanler={onChangeHanler}
                setOpen={setOpen}
            />
        </div>
    )
}
