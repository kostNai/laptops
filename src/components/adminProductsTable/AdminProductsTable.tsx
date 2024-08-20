'use client'

import { FormEvent, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'

import { toast } from 'sonner'
import { ProductType } from '@/types/ProductType'
import { deleteProduct } from '@/lib/data'
import { refresh, revalidateData } from '@/lib/actions'
import CustomAlertDilog from '@/components/alertDilog/CustomAlertDilog'
import axios from 'axios'
import TestComponent from '../testComponent/TestComponent'
type Props = {
    products: ProductType[]
}

export default function AdminProductsTable({ products }: Props) {
    const { data: session, status, update } = useSession()
    const [isChangeProduct, setIsChangeProduct] = useState<boolean | undefined>(
        false
    )
    const router = useRouter()
    const pathName = usePathname()

    const token = session?.user?.access_token
    const decoded = jwtDecode(token!)
    const isTokenExp = new Date(0).setUTCSeconds(decoded.exp!) - Date.now()

    const deleteProductHandler = async (id: string) => {
        if (token) {
            if (isTokenExp <= 0) {
                toast.error('Помилка авторизації! Увійдіть в акаунт')
                signOut()
                router.push('/login')
            }
            if (token) {
                try {
                    console.log('test')
                    const res = await axios.delete(
                        'http://localhost:3000/api/product',
                        {
                            data: { id, token }
                        }
                    )
                    const refreshedToken = await refresh(token)
                    update({ access_token: refreshedToken })
                    revalidateData('/admin/products')
                    toast.success('Успішно видалено')
                    setIsChangeProduct(false)
                } catch (error: any) {
                    toast.error(error.message)
                }
            }
        }
    }
    return (
        <div className="mt-16 px-8">
            <TestComponent />
            <table className="w-full table-fixed">
                <thead className="bg-body-bg ">
                    <tr>
                        <th className="text-center py-1">Назва продукту</th>
                        <th className="text-center p-1">Ціна</th>
                        <th className="text-center p-1">Продажі(шт)</th>
                        <th className="text-center p-1">Доданий</th>
                        <th className="text-center p-1+">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {products.map((product: ProductType) => (
                        <tr
                            key={product.id}
                            className="hover:bg-header-bg hover:bg-opacity-50 hover:text-white hover:cursor-pointer transition duratoin-300"
                            onClick={() =>
                                router.push(`${pathName}/${product.id}`)
                            }
                        >
                            <td className="text-center p-0">{product.name}</td>
                            <td className="text-center p-0">
                                {product.price} грн
                            </td>
                            <td className="text-center p-0">
                                {product.sales_count}
                            </td>
                            <td className="text-center p-0">
                                {new Date(product.created_at!).toLocaleString(
                                    'uk',
                                    { timeZone: 'UTC' }
                                )}
                            </td>
                            <td
                                className="text-center p-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="w-full py-2 flex justify-center">
                                    <CustomAlertDilog
                                        deleteProductHandler={
                                            deleteProductHandler
                                        }
                                        product={product}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div></div>
        </div>
    )
}
