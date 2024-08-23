import AdminUserTable from '@/components/adminUserTable/AdminUSerTable'
import TestComponent from '@/components/testComponent/TestComponent'
import { UserType } from '@/types'
import axios from 'axios'
import React, { Suspense } from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default async function UsersPage() {
    const users: UserType[] = (
        await axios.get(`http://localhost:3000/api/users`)
    ).data.users

    return (
        <div className="overflow-auto">
            <Suspense
                fallback={
                    <div className="absolute top-1/2 left-1/2 ">
                        <FaSpinner size={100} className="animate-spin" />
                    </div>
                }
            >
                <AdminUserTable users={users} />
            </Suspense>
        </div>
    )
}
