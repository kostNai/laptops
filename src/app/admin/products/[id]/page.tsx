import React, { Suspense } from 'react'
import AdminSingleProductCard from '@/components/adminSingleProductCard/AdminSingleProductCard'

export default async function ProductPage({
    params
}: {
    params: { id: string }
}) {
    return (
        <div className="w-full pl-8 mt-16">
            <h2 className="text-2xl font-bold">Подробиці про продукт:</h2>
            <AdminSingleProductCard id={params.id} />
        </div>
    )
}
