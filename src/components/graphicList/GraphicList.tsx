'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { addNewGraphic, getFilteredData, getGraphicList } from '@/lib/data'
import { GraphicType } from '@/types/GraphicType'
import { ProductType } from '@/types/ProductType'
import FadeLoader from 'react-spinners/FadeLoader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa6'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { revalidateData } from '@/lib/actions'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
    graphicList: GraphicType[]
}

export default function GraphicList({
    product,
    setProduct,
    graphicList
}: Props) {
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
    const [newGraphic, setNewGraphic] = useState<GraphicType | null>(null)
    const [open, setOpen] = useState(false)

    const session = useSession()
    const pathName = usePathname()
    const token = session.data?.user?.access_token

    const slug = `${newGraphic?.manufacturer}_${newGraphic?.series}_${newGraphic?.model}_${newGraphic?.type}`
    const onChangeHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewGraphic({ ...newGraphic!, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        console.log(newGraphic)
        if (token && newGraphic) {
            try {
                const res = await addNewGraphic({ ...newGraphic, slug }, token)

                if (res.status === 200) {
                    toast.success('Додано успішно')
                    revalidateData(pathName)
                    setOpen(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="8 py-4 px-2   border-solid border-gray-200  border-b-2 ">
            <div>
                <h3 className="text-xl font-bold">Графіка</h3>
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
                        {graphicList?.map(
                            (graphic: GraphicType, indx: number) => (
                                <div
                                    className="flex items-center space-x-2"
                                    key={indx}
                                >
                                    <RadioGroupItem
                                        value={graphic.id!}
                                        id={graphic.id}
                                    />
                                    <Label
                                        htmlFor={graphic.id}
                                    >{`${graphic.manufacturer} ${graphic.series} ${graphic.model} `}</Label>
                                </div>
                            )
                        )}
                    </RadioGroup>
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
                            <DialogTitle>Додати нову графіку</DialogTitle>
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
                                    placeholder="Виробник"
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
                                    placeholder="Серія"
                                    className="col-span-3"
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
                                    placeholder="Модель"
                                    className="col-span-3"
                                    onChange={onChangeHanler}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    Тип
                                </Label>
                                <Input
                                    id="type"
                                    name="type"
                                    placeholder="Тип"
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
