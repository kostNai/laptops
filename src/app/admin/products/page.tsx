import AdminProductsTable from '@/components/adminProductsTable/AdminProductsTable'
import { getProducts } from '@/lib/data'
import React, { Suspense } from 'react'

export default async function AdminProductsPage() {
    const products = await getProducts()

    return (
        <div>
            <Suspense
                fallback={
                    <div className="absolute top-1/2 left-1/2 text-3xl font-extrabold">
                        Products loading...
                    </div>
                }
            >
                <AdminProductsTable products={products} />
            </Suspense>
        </div>
    )
}
