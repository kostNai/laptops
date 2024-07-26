'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AiOutlineLaptop } from 'react-icons/ai'
import { MdDashboard } from 'react-icons/md'
import { FaUsersGear } from 'react-icons/fa6'
import { TbMessageDots } from 'react-icons/tb'
import { IoIosSettings } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function AdminNavBar() {
    const pathName = usePathname()
    const session = useSession()

    return (
        <div className=" flex flex-col justify-between h-full ml-4 ">
            <nav>
                <ul className=" flex flex-col gap-8 ">
                    <Link href={`/admin/dashboard`}>
                        {' '}
                        <li
                            className={
                                pathName.includes('dashboard')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg'
                            }
                        >
                            <MdDashboard />
                            DashBoard
                        </li>
                    </Link>
                    <Link href={`/admin/products`}>
                        <li
                            className={
                                pathName.includes('products')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg'
                            }
                        >
                            <AiOutlineLaptop />
                            Товари
                        </li>
                    </Link>
                    <Link href={`/admin/users`}>
                        <li
                            className={
                                pathName.includes('users')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg'
                            }
                        >
                            <FaUsersGear />
                            Користувачі
                        </li>
                    </Link>
                    <Link href={`/admin/messages`}>
                        <li
                            className={
                                pathName.includes('messages')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg'
                            }
                        >
                            <TbMessageDots size={24} />
                            Повідомлення
                        </li>
                    </Link>
                    <Link href={`/admin/settings`}>
                        {' '}
                        <li
                            className={
                                pathName.includes('settings')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg'
                            }
                        >
                            <IoIosSettings size={24} />
                            Налаштування
                        </li>
                    </Link>
                </ul>
            </nav>
            <div className=" p-4 flex mb-8 ">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-3xl relative object-contain">
                        <Image src={session.data?.user?.img!} alt="" fill />
                    </div>
                    <div>
                        <p className="text-sm">{session.data?.user?.name!}</p>
                        <p className="text-sm text-admin-text">
                            {session.data?.user?.email}
                        </p>
                    </div>
                    <div>
                        <IoLogOut
                            className="text-admin-text ml-2 transition duration-300 cursor-pointer hover:text-black"
                            size={28}
                            onClick={() => signOut()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
