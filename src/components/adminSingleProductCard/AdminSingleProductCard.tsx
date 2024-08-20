'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { ProductType } from '@/types/ProductType'
import ProductBlockList from '../productBlockList/ProductBlockList'
import SelectCpu from '../componentSelects/selectCpu/SelectCpu'
import SelectDisplay from '../componentSelects/selectCpu/SelectDisplay'
import SelectMemory from '../componentSelects/selectCpu/SelectMemory'
import SelectRam from '../componentSelects/selectCpu/SelectRam'
import SelectGraphic from '../componentSelects/selectCpu/SelectGraphic'
import { FaSpinner } from 'react-icons/fa6'
import { getProduct } from '@/lib/fetcher'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useFormState } from 'react-dom'
import ProductImage from '../productImage/ProductImage'

type Props = {
    id: string
}
const initialState = { message: '', success: false, token: '' }
export default function AdminSingleProductCard({ id }: Props) {
    const { data: session, status, update } = useSession()
    const updateSession = (access_token: string) => {
        update({ access_token })
    }
    const token = session?.user?.access_token
    const [isLoading, setIsLoading] = useState(false)
    const product = getProduct(id)

    return product && !isLoading ? (
        <div className="w-full my-16 h-full ">
            <button onClick={() => console.log(session?.user?.access_token)}>
                click
            </button>
            <div className=" bg-white mr-8 px-8 rounded-lg h-full ">
                <ProductImage
                    product={product}
                    token={token!}
                    initialState={initialState}
                    updateSession={updateSession}
                />
                <ProductBlockList
                    product={product}
                    updateSession={updateSession}
                />
                <SelectCpu
                    product={product}
                    token={token!}
                    initialState={initialState}
                    updateSession={updateSession}
                />
                <SelectDisplay
                    product={product}
                    token={token!}
                    initialState={initialState}
                    updateSession={updateSession}
                />
                <SelectMemory
                    product={product}
                    token={token!}
                    initialState={initialState}
                    updateSession={updateSession}
                />
                <SelectRam
                    product={product}
                    token={token!}
                    initialState={initialState}
                    updateSession={updateSession}
                />
                <SelectGraphic
                    product={product}
                    token={token!}
                    initialState={initialState}
                    updateSession={updateSession}
                />
            </div>
        </div>
    ) : (
        <div className="absolute left-1/2 top-1/2">
            <FaSpinner size={100} className="animate-spin" />
        </div>
    )
}
