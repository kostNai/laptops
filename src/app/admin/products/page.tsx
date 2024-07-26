import AdminProductsTable from '@/components/adminProductsTable/AdminProductsTable'
import React, { Suspense } from 'react'

export default function AdminProductsPage() {
    return (
        <div>
            <Suspense
                fallback={
                    <div className="absolute top-1/2 left-1/2 text-3xl font-extrabold">
                        Products loading...
                    </div>
                }
            >
                <AdminProductsTable />
            </Suspense>
        </div>
    )
}
