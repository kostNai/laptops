'use client'
import React, { FormEvent } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { UserType } from '@/types'
import { Button } from '../ui/button'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { revalidatePath } from 'next/cache'
import { revalidateData } from '@/lib/actions'

type Props = {
    users: UserType[]
}

export default function AdminUserTable({ users }: Props) {
    const router = useRouter()
    const pathName = usePathname()

    const onClickHandler = async (id: string) => {
        const res = await axios.delete(`http://localhost:3000/api/users`, {
            data: { id }
        })
        if (res.data.res.status) {
            revalidateData(pathName)
            toast.success('Видалено успішно')
        } else toast.error(res.data.res.message)
    }
    return (
        <Table className="mt-32">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader
                className="sticky top-0
            bg-gray-700 opacity-100"
            >
                <TableRow className=" [&>*:nth-child(n)]:text-center [&>th]:text-white ">
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Ім'я</TableHead>
                    <TableHead>Логін</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Адмін</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow
                        key={user.username}
                        className="hover:bg-gray-600 hover:bg-opacity-25 cursor-pointer [&>*:nth-child(n)]:text-center"
                        onClick={() => router.push(`${pathName}/${user.id}`)}
                    >
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.is_admin ? 'Так' : 'Ні'} </TableCell>
                        <TableCell
                            className="text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="link"
                                className="text-red-400 p-0 w-full "
                                onClick={() => onClickHandler(user.id!)}
                            >
                                Видалити
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
