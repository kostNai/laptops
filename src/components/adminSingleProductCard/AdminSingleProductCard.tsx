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

type Props = {
    id: string
}

export default function AdminSingleProductCard({ id }: Props) {
    const [product, setProduct] = useState<ProductType>()

    useEffect(() => {
        const fetchProduct = async () => {
            setProduct((await axios.get(`/api/product/?id=${id}`)).data.product)
        }
        fetchProduct()
    }, [])
    return (
        product && (
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
                    <SelectCpu product={product} />
                    <SelectDisplay product={product} />
                    <SelectMemory product={product} />
                    <SelectRam product={product} />
                    <SelectGraphic product={product} />
                </div>
            </div>
        )
    )
}
