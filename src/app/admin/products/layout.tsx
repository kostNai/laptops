import Link from 'next/link'
import React from 'react'
import { headers } from 'next/headers'
import AdminProductsNav from '@/components/adminProductsNav/AdminProductsNav'

const BASE_URL = 'http://localhost:3000'

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
