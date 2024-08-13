'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'

import { toast } from 'sonner'
import { ProductType } from '@/types/ProductType'
import { deleteProduct } from '@/lib/data'
import { revalidateData } from '@/lib/actions'
import CustomAlertDilog from '@/components/alertDilog/CustomAlertDilog'
type Props = {
    products: ProductType[]
}

export default function AdminProductsTable({ products }: Props) {
    const session = useSession()
    const [isChangeProduct, setIsChangeProduct] = useState<boolean | undefined>(
        false
    )
    const router = useRouter()
    const pathName = usePathname()

    const token = session.data?.user?.access_token
    const decoded = jwtDecode(token!)
    const isTokenExp = new Date(0).setUTCSeconds(decoded.exp!) - Date.now()

    const deleteProductHandler = async (productId: string) => {
        if (token) {
            if (isTokenExp <= 0) {
                toast.error('Помилка авторизації! Увійдіть в акаунт')
                signOut()
                router.push('/login')
            }
            const res = await deleteProduct(productId, token)
            if (res.status === 200) {
                toast.success('Успішно видалено')
                revalidateData('/admin/products')
                setIsChangeProduct(false)
            }
        }
    }
    return (
        <div className="mt-16 px-8">
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
                            <td className="text-center p-0">
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
