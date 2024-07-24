import AdminNavBar from '@/components/adminNavBar/AdminNavBar'
import Link from 'next/link'
import React from 'react'

export default function AdminLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className="h-screen bg-white grid grid-cols-6 ">
            <div className="col-span-1 bg-white h-screen">
                <div className="mt-8 flex justify-center">
                    <Link href={'/'} className="text-xl font-bold">
                        Laptops by Sanya
                    </Link>
                </div>
                <div className="h-full">
                    <AdminNavBar />
                </div>
            </div>
            <div className="col-span-5 bg-admin-page-bg">{children}</div>
        </section>
    )
}
