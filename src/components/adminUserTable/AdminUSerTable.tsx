'use client'
import React, { useEffect, useState } from 'react'
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
import { refresh, revalidateData } from '@/lib/actions'
import { useSession } from 'next-auth/react'
import { FaSpinner } from 'react-icons/fa6'

export default function AdminUserTable() {
    const router = useRouter()
    const pathName = usePathname()
    const { data: session, status, update } = useSession()
    const token = session?.user?.access_token
    const [users, setUsers] = useState<UserType[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState('1')
    const [total, setTotal] = useState()
    const [currentPage, setCurrentPage] = useState(0)

    const perPage = 10
    const pagesCount: number = Math.ceil(total! / perPage)
    let pagesNumber: number[] = []
    for (let index = 0; index < pagesCount; index++) {
        pagesNumber.push(index + 1)
    }
    useEffect(() => {
        const getUsers = () => {
            axios
                .get(`http://localhost:3000/api/users?page=${page}`)
                .then((data: any) => {
                    console.log(data)
                    setIsLoading(true)
                    setUsers(data.data.data)
                    setTotal(data.data.total)
                    setCurrentPage(data.data.current_page)
                    console.log(currentPage)
                })
            setIsLoading(false)
        }
        getUsers()
    }, [page])

    const onDeleteHandler = async (id: string) => {
        try {
            if (token) {
                const res = await axios.delete(
                    `http://localhost:3000/api/users`,
                    {
                        data: { id, token }
                    }
                )
            }
            const refreshedToken = await refresh(token!)
            update({ access_token: refreshedToken })
            revalidateData(pathName)
            toast.success('Видалено успішно')
        } catch (error: any) {
            toast.error(error.response.data.response.toString())
        }
    }
    return isLoading ? (
        <div>
            <Table className="mt-32 ">
                <TableHeader className="sticky top-0 bg-gray-700 opacity-100">
                    <TableRow className=" [&>*:nth-child(n)]:text-center [&>th]:text-white ">
                        <TableHead className="w-[100px]">№</TableHead>
                        <TableHead>Ім'я</TableHead>
                        <TableHead>Логін</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Адмін</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users?.map((user, indx) => (
                        <TableRow
                            key={user.username}
                            className="hover:bg-gray-600 hover:bg-opacity-25 cursor-pointer [&>*:nth-child(n)]:text-center"
                            onClick={() =>
                                router.push(`${pathName}/${user.id}`)
                            }
                        >
                            <TableCell className="font-medium">
                                {(+page - 1) * 10 + (indx + 1)}
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.is_admin ? 'Так' : 'Ні'}{' '}
                            </TableCell>
                            <TableCell
                                className="text-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Button
                                    variant="link"
                                    className="text-red-400 p-0 w-full "
                                    onClick={() => onDeleteHandler(user.id!)}
                                >
                                    Видалити
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="my-8 flex justify-center">
                <ul className="flex gap-6  [&>*:nth-child(n)]:text-xl [&>*:nth-child(n)]:cursor-pointer">
                    {pagesNumber.map((el) => (
                        <li
                            onClick={() => setPage(el.toString())}
                            className={
                                currentPage === el
                                    ? 'border-b-2 border-b-red-600 border-solid'
                                    : ''
                            }
                        >
                            {el}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <div className="absolute top-1/2 left-1/2 ">
            <FaSpinner size={100} className="animate-spin" />
        </div>
    )
}
