import AdminProductsTable from '@/components/adminProductsTable/AdminProductsTable'
import { getProducts } from '@/lib/data'
import React, { Suspense } from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default async function AdminProductsPage() {
    const products = await getProducts()

    return (
        <div>
            <Suspense
                fallback={
                    <div className="absolute top-1/2 left-1/2 ">
                        <FaSpinner size={100} className="animate-spin" />
                    </div>
                }
            >
                <AdminProductsTable products={products} />
            </Suspense>
        </div>
    )
}
