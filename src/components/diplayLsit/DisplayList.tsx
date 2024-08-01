'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { addNewDisplay } from '@/lib/data'
import { DisplayType } from '@/types/DisplayType'
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
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { FaPlus } from 'react-icons/fa6'
import { revalidateData } from '@/lib/actions'
import { getFilteredData } from '@/lib/fetcher'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}

const MAX_LIMIT_CHARACTERISTICS = 4

export default function DisplayList({ product, setProduct }: Props) {
    const displayList = getFilteredData('Display')?.display_list

    const [newDisplay, setNewDisplay] = useState<DisplayType | null>(null)
    const [open, setOpen] = useState(false)
    const [getMore, setGetMore] = useState<boolean>()
    const [defaultFields, setDefaultFields] = useState<DisplayType[]>()
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    const pathName = usePathname()

    const token = session.data?.user?.access_token

    useEffect(() => {
        if (displayList) {
            getMore
                ? setDefaultFields(displayList)
                : setDefaultFields(
                      displayList.slice(0, MAX_LIMIT_CHARACTERISTICS)
                  )

            setIsLoading(false)
        }
    }, [getMore, displayList])

    const slug = `${newDisplay?.matrix}_${newDisplay?.size}_${newDisplay?.resolution}_${newDisplay?.cover}`
    const onChangeHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDisplay({ ...newDisplay!, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        console.log(newDisplay)
        if (token && newDisplay) {
            try {
                const res = await addNewDisplay({ ...newDisplay, slug }, token)

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
                <h3 className="text-xl font-bold">Дисплей</h3>
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
                            defaultFields?.map(
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
                {displayList?.length! > MAX_LIMIT_CHARACTERISTICS && (
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
                            <DialogTitle>Додати новий Дисплей</DialogTitle>
                            <DialogDescription>
                                Заповніть усі поля
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cover" className="text-right">
                                    Покриття
                                </Label>
                                <Input
                                    id="cover"
                                    name="cover"
                                    className="col-span-3"
                                    placeholder="Покриття"
                                    onChange={onChangeHanler}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="matrix" className="text-right">
                                    Матриця
                                </Label>
                                <Input
                                    id="matrix"
                                    name="matrix"
                                    placeholder="Матриця"
                                    className="col-span-3"
                                    onChange={onChangeHanler}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="size" className="text-right">
                                    Діагональ
                                </Label>
                                <Input
                                    id="size"
                                    name="size"
                                    placeholder="Діагональ"
                                    className="col-span-3"
                                    onChange={onChangeHanler}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="resolution"
                                    className="text-right"
                                >
                                    Роздільна здатність
                                </Label>
                                <Input
                                    id="resolution"
                                    name="resolution"
                                    placeholder="Роздільна здатність"
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
