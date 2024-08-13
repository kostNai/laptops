'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { addNewRam } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import { RamType } from '@/types/RamType'
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
    { title: "Об'єм", name: 'memory' }
]
export default function RamList({ product, setProduct, id }: Props) {
    const ramList = getFilteredData('Ram')?.ram_list

    const [newRam, setNewRam] = useState<RamType | null>(null)
    const [open, setOpen] = useState(false)
    const [getMore, setGetMore] = useState<boolean>()
    const [defaultFields, setDefaultFields] = useState<RamType[]>()
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    const pathName = usePathname()

    const token = session.data?.user?.access_token
    const slug = `${newRam?.manufacturer}_${newRam?.type}_${newRam?.memory}`

    useEffect(() => {
        if (ramList) {
            getMore
                ? setDefaultFields(ramList)
                : setDefaultFields(ramList.slice(0, MAX_LIMIT_CHARACTERISTICS))

            setIsLoading(false)
        }
    }, [getMore, ramList])

    const onChangeHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRam({ ...newRam!, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        console.log(newRam)
        if (token && newRam) {
            try {
                const res = await addNewRam({ ...newRam, slug }, token)

                if (res.status === 200) {
                    toast.success('Додано успішно')
                    revalidate('Ram')
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
                <h3 className="text-xl font-bold">ОЗУ</h3>
                {isLoading ? (
                    <FadeLoader />
                ) : (
                    <RadioGroup
                        defaultValue="option-one"
                        className="mt-4"
                        onValueChange={(e) =>
                            setProduct({ ...product, ram_id: e })
                        }
                    >
                        {defaultFields?.map((ram: RamType, indx: number) => (
                            <div
                                className="flex items-center space-x-2"
                                key={indx}
                            >
                                <RadioGroupItem value={ram.id!} id={ram.id} />
                                <Label
                                    htmlFor={ram.id}
                                >{`${ram.manufacturer} ${ram.memory}GB`}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
                {ramList?.length! > MAX_LIMIT_CHARACTERISTICS && (
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
                title="ОЗУ"
                componentFields={DIALOG_FIELDS}
                onSubmitHandler={onSubmitHandler}
                onChangeHanler={onChangeHanler}
                setOpen={setOpen}
            />
        </div>
    )
}
