import AdminNavBar from '@/components/adminNavBar/AdminNavBar'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default async function AdminLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className="h-dvh bg-white grid grid-cols-6 place-items-stretch ">
            <div className="col-span-1 bg-white  flex flex-col gap-32">
                <div className="mt-8 flex justify-center">
                    <Link href={'/'} className="text-xl font-bold">
                        Laptops by Sanya
                    </Link>
                </div>
                <div className="h-full">
                    <Suspense fallback={<div className='text-3xl font-bold absolute top-1/2 left-1/2'>Admin suspense</div>}>
                        <AdminNavBar />
                    </Suspense>
                </div>
            </div>
            <div className="col-span-5 bg-admin-page-bg">{children}</div>
        </section>
    )
}
