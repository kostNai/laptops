import AdminSingleUserCard from '@/components/adminSingleUserCard/AdminSingleUserCard'
import React from 'react'

export default async function SingleUserPage({
    params
}: {
    params: { id: string }
}) {
    return (
        <div>
            <AdminSingleUserCard id={params.id} />
        </div>
    )
}
