'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import ComponentsList from '../componentsList/ComponentsList'
import { Label } from '../ui/label'
import { addProduct } from '@/lib/actions'
import { ProductType } from '@/types/ProductType'
import { useFormState } from 'react-dom'
import TestComponent from '../testComponent/TestComponent'

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
const initialState = { message: '', success: false, token: '' }

export default function AddProductForm() {
    const [product, setProduct] = useState<ProductType | null>(null)
    const [disable, setDisable] = useState<boolean>()
    const refs = useRef<HTMLInputElement[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    const { data: session, status, update } = useSession()
    const token = session?.user?.access_token
    const addProductWithToken = addProduct.bind(null, token!)

    const [state, formAction] = useFormState(addProductWithToken, initialState)
    const updateSession = (access_token: string) => {
        update({ access_token })
    }
    useEffect(() => {
        state.message && !state.success ? toast.error(state.message) : false
        state.success && toast.success(state.message)
        updateSession(state.token)
        const additionalProductFields =
            product?.cpu_id! &&
            product.display_id! &&
            product.graphic_id! &&
            product.ram_id! &&
            product.memory_id!

        refs.current.every((e) => e.value.length > 0) && additionalProductFields
            ? setDisable(false)
            : setDisable(true)
    }, [product, state])
    if (formRef.current && state.success) {
        formRef.current.reset()
    }
    // const decoded = jwtDecode(token!)
    // const isTokenExp = new Date(0).setUTCSeconds(decoded.exp!) - Date.now()

    return (
        <div>
            <TestComponent />
            <form
                action={formAction}
                className="mt-16 mx-8 bg-white rounded-xl p-2 "
                ref={formRef}
            >
                <h2 className="text-2xl font-bold">Новий продукт</h2>
                <div className="p-2 mt-8 flex gap-4 flex-wrap items-start">
                    {productFields.map((productField, indx) => (
                        <label
                            htmlFor={productField.name}
                            key={productField.field}
                        >
                            {productField.field}
                            <Input
                                type="text"
                                name={productField.name}
                                placeholder={productField.field}
                                // onChange={onChangeHandler}
                                ref={(el) => {
                                    refs.current[indx] = el!
                                }}
                            />
                        </label>
                    ))}
                </div>
                <ComponentsList product={product!} setProduct={setProduct} />
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
                    <Label htmlFor="product_img">Picture</Label>
                    <Input id="product_img" name="product_img" type="file" />
                </div>
                <Button className="w-40 mt-8" type="submit" disabled={disable}>
                    Додати
                </Button>
            </form>
        </div>
    )
}
