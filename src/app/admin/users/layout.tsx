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
            <div className="px-4 max-sm:px-0">{children}</div>
        </div>
    )
}
