import AdminUsersNav from '@/components/adminUsersNav/AdminUsersNav'
import React from 'react'

export default function layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <AdminUsersNav />
            <div>{children}</div>
        </div>
    )
}
