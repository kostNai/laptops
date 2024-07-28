'use client'

import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import React, { FormEvent, Suspense, useEffect, useRef, useState } from 'react'
import CpuList from './cpuList/CpuList'
import { ProductType } from '@/types/ProductType'
import DisplayList from './diplayLsit/DisplayList'
import MemoryList from './memoryList/MemoryList'
import RamList from './ramList/RamList'
import GraphicList from './graphicList/GraphicList'
import { addProduct } from '@/lib/data'

export default function AddProductForm() {
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
    const refs = useRef<HTMLInputElement[]>([])

    useEffect(() => {
        refs.current.every((e) => e.value.length > 0)
            ? setDisable(false)
            : setDisable(true)
    }, [product])

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
        const res = await addProduct(formData).then((data) => {
            if (data.status === 200) {
                setProduct(null)
                setDisable(false)
            }
        })
    }

    return (
        <form
            className="mt-16 mx-8 bg-white rounded-xl p-2"
            onSubmit={onSubmitHandler}
        >
            <h2 className="text-2xl font-bold">Новий продукт</h2>
            <div className="p-2 mt-8 flex flex-col gap-4 flex-wrap  h-80">
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
            <CpuList product={product!} setProduct={setProduct} />
            <DisplayList product={product!} setProduct={setProduct} />
            <MemoryList product={product!} setProduct={setProduct} />
            <RamList product={product!} setProduct={setProduct} />
            <GraphicList product={product!} setProduct={setProduct} />
            <Button className="w-40 mt-8" type="submit" disabled={disable}>
                Додати
            </Button>
        </form>
    )
}
