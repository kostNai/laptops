import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { addNewMemory, getFilteredData, getMemoryList } from '@/lib/data'
import { MemoryType } from '@/types/MemoryType'
import { ProductType } from '@/types/ProductType'
import React, { FormEvent, useEffect, useState } from 'react'
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
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { revalidateData } from '@/lib/actions'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
    memoryList: MemoryType[]
}

export default function MemoryList({ product, setProduct, memoryList }: Props) {
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
    const [newMemory, setNewMemory] = useState<MemoryType | null>(null)
    const [open, setOpen] = useState(false)
    const session = useSession()
    const pathName = usePathname()
    const router = useRouter()

    const token = session.data?.user?.access_token

    const slug = `${newMemory?.manufacturer}_${newMemory?.type}_${newMemory?.size}`
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
                    revalidateData('/admin/products/add-product')
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
                    >
                        {memoryList?.map((memory: MemoryType, indx: number) => (
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
                        ))}
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
                            <DialogTitle>Додати Пам'ять</DialogTitle>
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
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="size" className="text-right">
                                    Об'єм
                                </Label>
                                <Input
                                    id="size"
                                    name="size"
                                    placeholder="Об'єм"
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
