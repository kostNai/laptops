'use client'

import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import React, { FormEvent, Suspense, useEffect, useState } from 'react'
import CpuList from './cpuList/CpuList'
import { ProductType } from '@/types/ProductType'
import DisplayList from './diplayLsit/DisplayList'

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
    const [product, setProduct] = useState<ProductType | undefined>()
    const [cpuId, setCpuId] = useState('')
    const [displayId, setDisplayId] = useState('')
    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
        console.log(displayId)
    }

    return (
        <form
            className="mt-16 mx-8 bg-white rounded-xl p-2"
            onSubmit={onSubmitHandler}
        >
            <h2 className="text-2xl font-bold">Новий продукт</h2>
            <div className="p-2 mt-8 flex flex-col gap-4 flex-wrap  h-80">
                {productFields.map((productField) => (
                    <label htmlFor={productField.name} key={productField.field}>
                        {productField.field}
                        <Input
                            type="text"
                            name={productField.name}
                            placeholder={productField.field}
                        />
                    </label>
                ))}
            </div>
            <CpuList cpuId={cpuId} setCpuId={setCpuId} />
            <DisplayList displayId={displayId} setDisplayId={setDisplayId} />
            <Button className="w-40" type="submit">
                Додати
            </Button>
        </form>
    )
}
