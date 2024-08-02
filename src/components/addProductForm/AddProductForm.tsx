'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { toast } from 'sonner'
import { ProductType } from '@/types/ProductType'
import { addProduct } from '@/lib/data'
import ComponentsList from '../componentsList/ComponentsList'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { Label } from '../ui/label'
import { revalidateData } from '@/lib/actions'

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
    const [disable, setDisable] = useState<boolean>()
    const [errors, setErrors] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [file, setFile] = useState<File | undefined>()
    const refs = useRef<HTMLInputElement[]>([])
    const session = useSession()
    const router = useRouter()

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
    const decoded = jwtDecode(token!)
    const isTokenExp = new Date(0).setUTCSeconds(decoded.exp!) - Date.now()

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
        const keys = Object.keys(product!)

        keys.map((key: string, indx) => {
            formData.append(key, Object.values(product!)[indx].toString())
        })
        formData.append('product_img', file!)
        if (token) {
            if (isTokenExp <= 0) {
                toast.error('Помилка авторизації! Увійдіть в акаунт')
                signOut()
                router.push('/login')
            }
            const res = await addProduct(file!, formData, token!)
                .then((data) => {
                    if (data.status === 200) {
                        toast.success('Продукт успішно додано')
                        setDisable(false)
                        setIsSuccess(true)
                        refs.current.some((e) => (e.value = ''))
                        if (errors.length > 0) {
                            setErrors('')
                        }
                        revalidateData('/admin/products')
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
            <ComponentsList product={product!} setProduct={setProduct} />
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
                <Label htmlFor="product_img">Picture</Label>
                <Input
                    id="product_img"
                    name="product_img"
                    type="file"
                    onChange={(e) => setFile(e.target.files![0])}
                />
            </div>
            {errors && <p className="text-sm text-red-500">{errors}</p>}
            <Button className="w-40 mt-8" type="submit" disabled={disable}>
                Додати
            </Button>
        </form>
    )
}
