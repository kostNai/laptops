import React from 'react'
import AdminProductsNav from '@/components/adminProductsNav/AdminProductsNav'

export default async function AdminProductsLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <AdminProductsNav />
            <div>{children}</div>
        </div>
    )
}
