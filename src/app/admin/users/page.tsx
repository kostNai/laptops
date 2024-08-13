import AdminUSerTable from '@/components/adminUserTable/AdminUSerTable'
import { UserType } from '@/types'
import axios from 'axios'
import React from 'react'

export default async function UsersPage() {
    const users: UserType[] = (
        await axios.get(`http://localhost:3000/api/users`)
    ).data.users
    users.map((user: UserType) => {
        console.log(typeof user.is_admin)
    })
    return (
        <div>
            <AdminUSerTable users={users} />
        </div>
    )
}
