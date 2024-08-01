'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Toaster } from 'sonner'
import { toast } from 'sonner'
import { ProductType } from '@/types/ProductType'
import { addProduct } from '@/lib/data'
import ComponentsList from '../componentsList/ComponentsList'
import { RamType } from '@/types/RamType'
import { CpuType } from '@/types/CpuType'
import { MemoryType } from '@/types/MemoryType'
import { GraphicType } from '@/types/GraphicType'
import { DisplayType } from '@/types/DisplayType'

type Props = {
    ramList: RamType[]
    // cpuList: CpuType[]
    memoryList: MemoryType[]
    graphicList: GraphicType[]
    displayList: DisplayType[]
}

export default function AddProductForm({
    ramList,
    // cpuList,
    memoryList,
    graphicList,
    displayList
}: Props) {
    const productFields = [
        {
            field: 'Виробник',
            name: 'manufacturer'
        },
        {
            field: 'Ціна',
            name: 'price'
        },
        {
            field: 'Назва',
            name: 'name'
        },
        {
            field: 'Модель',
            name: 'model'
        },
        {
            field: 'Колір',
            name: 'color'
        },
        {
            field: 'Маса',
            name: 'weight'
        },
        {
            field: 'Мультимедіа',
            name: 'multimedia'
        },
        {
            field: 'Розміри',
            name: 'dimensions'
        },
        {
            field: 'Операційна система',
            name: 'os'
        },
        {
            field: 'Опис',
            name: 'description'
        }
    ]

    const [product, setProduct] = useState<ProductType | null>(null)
    const [disable, setDisable] = useState(true)
    const [errors, setErrors] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const refs = useRef<HTMLInputElement[]>([])
    const session = useSession()

    useEffect(() => {
        const additionalProductFields =
            product?.cpu_id! &&
            product.display_id! &&
            product.graphic_id! &&
            product.ram_id! &&
            product.memory_id!

        refs.current.every((e) => e.value.length > 0) && additionalProductFields
            ? setDisable(false)
            : setDisable(true)
    }, [product])
    const token = session.data?.user?.access_token

    console.log('revalidated form')
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        setDisable(true)
        const formData: FormData = new FormData()
        formData.append('product', JSON.stringify(product))
        if (token) {
            const res = await addProduct(formData, token!)
                .then((data) => {
                    if (data.status === 200) {
                        toast.success('Продукт успішно додано')
                        setDisable(false)
                        setIsSuccess(true)
                    }
                })
                .catch((err) => setErrors(err.response.data.message))
        }
    }

    return (
        <form
            className="mt-16 mx-8 bg-white rounded-xl p-2 "
            onSubmit={onSubmitHandler}
        >
            <h2 className="text-2xl font-bold">Новий продукт</h2>
            <div className="p-2 mt-8 flex gap-4 flex-wrap items-start">
                {productFields.map((productField, indx) => (
                    <label htmlFor={productField.name} key={productField.field}>
                        {productField.field}
                        <Input
                            type="text"
                            name={productField.name}
                            placeholder={productField.field}
                            onChange={onChangeHandler}
                            ref={(el) => {
                                refs.current[indx] = el!
                            }}
                        />
                    </label>
                ))}
            </div>
            <ComponentsList
                product={product!}
                setProduct={setProduct}
                ramList={ramList}
                // cpuList={cpuList}
                memoryList={memoryList}
                graphicList={graphicList}
                displayList={displayList}
            />
            {errors && <p className="text-sm text-red-500">{errors}</p>}
            <Button className="w-40 mt-8" type="submit" disabled={disable}>
                Додати
            </Button>
        </form>
    )
}
