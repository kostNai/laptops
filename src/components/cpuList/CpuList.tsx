'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import { usePathname } from 'next/navigation'
import { FaPlus } from 'react-icons/fa6'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CpuType } from '@/types/CpuType'
import { addNewCpu } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { revalidateData } from '@/lib/actions'
import { getFilteredData } from '@/lib/fetcher'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}
const MAX_LIMIT_CHARACTERISTICS = 4

export default function CpuList({ product, setProduct }: Props) {
    const cpuList = getFilteredData('Cpu')?.cpu_list

    const [newCpu, setNewCpu] = useState<CpuType | null>(null)
    const [open, setOpen] = useState(false)
    const [getMore, setGetMore] = useState<boolean>()
    const [defaultFields, setDefaultFields] = useState<CpuType[]>()
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    const pathName = usePathname()

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
                    revalidateData(pathName)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="mt-8 py-4 px-2 border-t-2  border-solid border-gray-200  border-b-2 ">
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
            <div className="mt-8">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            Додати <FaPlus className="ml-2" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] w-fit">
                        <DialogHeader>
                            <DialogTitle>Додати новий Процесор</DialogTitle>
                            <DialogDescription>
                                Заповніть усі поля
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="manufacturer"
                                    className="text-right"
                                >
                                    Виробник
                                </Label>
                                <Input
                                    id="manufacturer"
                                    name="manufacturer"
                                    className="col-span-3"
                                    placeholder="Введіть назву виробника"
                                    onChange={onChangeHanler}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="model" className="text-right">
                                    Модель
                                </Label>
                                <Input
                                    id="model"
                                    name="model"
                                    placeholder="Введіть назву моделі"
                                    className="col-span-3"
                                    onChange={onChangeHanler}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="series" className="text-right">
                                    Серія
                                </Label>
                                <Input
                                    id="series"
                                    name="series"
                                    placeholder="Введіть серію"
                                    className="col-span-3"
                                    onChange={onChangeHanler}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="cores_value"
                                    className="text-right"
                                >
                                    Кількість ядер
                                </Label>
                                <Input
                                    id="cores_value"
                                    name="cores_value"
                                    placeholder="Введіть кількість ядер"
                                    className="col-span-3"
                                    onChange={onChangeHanler}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="frequency"
                                    className="text-right"
                                >
                                    Частота
                                </Label>
                                <Input
                                    name="frequency"
                                    placeholder="Введіть частоту роботи процесора у MHz"
                                    className="col-span-3"
                                    onChange={onChangeHanler}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={onSubmitHandler}>
                                Додати
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
