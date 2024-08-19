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

type Props = {
    id: string
}
const initialState = { message: '', success: false }
export default function AdminSingleProductCard({ id }: Props) {
    const session = useSession()
    const token = session.data?.user?.access_token
    const [isLoading, setIsLoading] = useState(false)
    const product = getProduct(id)
    return product && !isLoading ? (
        <div className="w-full my-16 h-full">
            <div className=" bg-white mr-8 px-8 rounded-lg h-full ">
                <div className="w-fit h-fit mt-16  border-[1px] border-gray-300 border-solid p-4 rounded-xl inline-block ">
                    <Image
                        src={
                            product.image
                                ? product.image
                                : '/test-card-image.png'
                        }
                        alt="product image"
                        width={300}
                        height={200}
                    />
                </div>
                <ProductBlockList product={product} />
                <SelectCpu
                    product={product}
                    token={token!}
                    initialState={initialState}
                />
                <SelectDisplay
                    product={product}
                    token={token!}
                    initialState={initialState}
                />
                <SelectMemory
                    product={product}
                    token={token!}
                    initialState={initialState}
                />
                <SelectRam
                    product={product}
                    token={token!}
                    initialState={initialState}
                />
                <SelectGraphic
                    product={product}
                    token={token!}
                    initialState={initialState}
                />
            </div>
        </div>
    ) : (
        <div className="absolute left-1/2 top-1/2">
            <FaSpinner size={100} className="animate-spin" />
        </div>
    )
}
