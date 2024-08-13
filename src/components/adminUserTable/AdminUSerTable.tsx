import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { UserType } from '@/types'

type Props = {
    users: UserType[]
}

export default function AdminUSerTable({ users }: Props) {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Ім'я</TableHead>
                    <TableHead>Логін</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Адмін</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.username}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="text-right">
                            {user.is_admin ? 'Так' : 'Ні'}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
