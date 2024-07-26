'use client'

import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React, { FormEvent, useEffect, useState } from 'react'
import { CpuType } from '@/types/CpuType'
import { getCpuList } from '@/lib/data'

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
    const [cpuList, setCpuList] = useState<CpuType[] | undefined>([])
    const [cpuId, setCpuId] = useState<string | undefined>('')

    useEffect(() => {
        const res = getCpuList().then((data) => {
            setCpuList(data)
        })
    }, [])

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
        console.log(cpuId)
    }
    const onChangeHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        setCpuId(e.currentTarget.value)
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
            <div className="mt-8 pt-4 px-2 border-t-2  border-solid border-gray-200 ">
                <h3 className="text-xl">Процесор</h3>
                <RadioGroup defaultValue="option-one" className="mt-4">
                    {cpuList?.map((cpu) => (
                        <div
                            className="flex items-center space-x-2"
                            key={cpu.id}
                        >
                            <RadioGroupItem
                                value={cpu.id!}
                                id={cpu.id}
                                checked={cpuId === cpu.id?.toString()!}
                                onChange={onChangeHandler}
                            />
                            <Label
                                htmlFor={cpu.id}
                            >{`${cpu.manufacturer} ${cpu.model}`}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <Button className="w-40" type="submit">
                Додати
            </Button>
        </form>
    )
}
