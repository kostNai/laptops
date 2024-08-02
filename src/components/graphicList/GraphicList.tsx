'use client'

import { useSession } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { addNewGraphic } from '@/lib/data'
import { GraphicType } from '@/types/GraphicType'
import { ProductType } from '@/types/ProductType'
import FadeLoader from 'react-spinners/FadeLoader'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { getFilteredData, revalidate } from '@/lib/fetcher'
import ComponentDilog from '../componentDilog/ComponentDilog'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}

const MAX_LIMIT_CHARACTERISTICS = 4
const DIALOG_FIELDS = [
    { title: 'Виробник', name: 'manufacturer' },
    { title: 'Серія', name: 'series' },
    { title: 'Модель', name: 'model' },
    { title: 'Тип', name: 'type' }
]

export default function GraphicList({ product, setProduct }: Props) {
    const graphicList = getFilteredData('Graphic')?.graphic_list

    const [newGraphic, setNewGraphic] = useState<GraphicType | null>(null)
    const [open, setOpen] = useState(false)
    const [getMore, setGetMore] = useState<boolean>()
    const [defaultFields, setDefaultFields] = useState<GraphicType[]>()
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()

    const token = session.data?.user?.access_token
    const slug = `${newGraphic?.manufacturer}_${newGraphic?.series}_${newGraphic?.model}_${newGraphic?.type}`

    useEffect(() => {
        if (graphicList) {
            getMore
                ? setDefaultFields(graphicList)
                : setDefaultFields(
                      graphicList.slice(0, MAX_LIMIT_CHARACTERISTICS)
                  )

            setIsLoading(false)
        }
    }, [getMore, graphicList])

    const onChangeHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewGraphic({ ...newGraphic!, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()

        if (token && newGraphic) {
            try {
                const res = await addNewGraphic({ ...newGraphic, slug }, token)

                if (res.status === 200) {
                    toast.success('Додано успішно')
                    revalidate('Graphic')
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
                        {defaultFields?.map(
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
                {graphicList?.length! > MAX_LIMIT_CHARACTERISTICS && (
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
                title="Графіку"
                componentFields={DIALOG_FIELDS}
                onSubmitHandler={onSubmitHandler}
                onChangeHanler={onChangeHanler}
                setOpen={setOpen}
            />
        </div>
    )
}
