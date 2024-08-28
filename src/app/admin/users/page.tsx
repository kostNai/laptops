import AdminUserTable from '@/components/adminUserTable/AdminUSerTable'
import TestComponent from '@/components/testComponent/TestComponent'
import { UserType } from '@/types'
import axios from 'axios'
import React, { Suspense } from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default async function UsersPage() {
    return (
        <div className="overflow-auto">
            <AdminUserTable />
        </div>
    )
}
