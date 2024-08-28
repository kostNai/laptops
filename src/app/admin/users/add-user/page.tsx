import AddUserForm from '@/components/addUserForm/AddUserForm'
import React from 'react'

export default function AddUserPage() {
    return (
        <div className="mt-16 ml-4 max-md:mx-4">
            <h2 className="text-xl font-bold max-sm:text-center">
                Додати нового користувача
            </h2>
            <AddUserForm />
        </div>
    )
}
