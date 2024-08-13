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
import { Button } from '../ui/button'
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
    { title: 'Покриття', name: 'cover' },
    { title: 'Матриця', name: 'matrix' },
    { title: 'Серія', name: 'size' },
    { title: 'Роздільна здатність', name: 'resolution' }
]

export default function DisplayList({ product, setProduct, id }: Props) {
    const displayList = getFilteredData('Display')?.display_list

    const [newDisplay, setNewDisplay] = useState<DisplayType | null>(null)
    const [open, setOpen] = useState(false)
    const [getMore, setGetMore] = useState<boolean>()
    const [defaultFields, setDefaultFields] = useState<DisplayType[]>()
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()

    const token = session.data?.user?.access_token
    const slug = `${newDisplay?.matrix}_${newDisplay?.size}_${newDisplay?.resolution}_${newDisplay?.cover}`

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
                    revalidate('Display')
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
            <ComponentDilog
                open={open}
                title="Дисплей"
                componentFields={DIALOG_FIELDS}
                onSubmitHandler={onSubmitHandler}
                onChangeHanler={onChangeHanler}
                setOpen={setOpen}
            />
        </div>
    )
}
