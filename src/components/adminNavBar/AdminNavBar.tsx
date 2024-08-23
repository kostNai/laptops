'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import { AiOutlineLaptop } from 'react-icons/ai'
import { MdDashboard } from 'react-icons/md'
import { FaUsersGear } from 'react-icons/fa6'
import { TbMessageDots } from 'react-icons/tb'
import { IoIosSettings } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdminNavBar() {
    const pathName = usePathname()
    const session = useSession()

    return (
        <div className=" flex flex-col justify-between h-full ml-4 max-lg:ml-0">
            <nav>
                <ul className=" flex flex-col gap-8 ">
                    <Link href={`/admin/dashboard`}>
                        {' '}
                        <li
                            className={
                                pathName.includes('dashboard')
                                    ? 'w-full transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg max-lg:flex max-lg:justify-center'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg max-lg:flex max-lg:justify-center'
                            }
                        >
                            <MdDashboard className="max-lg:size-12 lg:hidden 2xl:block" />
                            <span className="max-lg:hidden">DashBoard</span>
                        </li>
                    </Link>
                    <Link href={`/admin/products`}>
                        <li
                            className={
                                pathName.includes('products')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg max-lg:justify-center'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg max-lg:justify-center'
                            }
                        >
                            <AiOutlineLaptop className="max-lg:size-12 lg:hidden 2xl:block" />
                            <span className="max-lg:hidden">Товари</span>
                        </li>
                    </Link>
                    <Link href={`/admin/users`}>
                        <li
                            className={
                                pathName.includes('users')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg max-lg:justify-center'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg max-lg:justify-center'
                            }
                        >
                            <FaUsersGear className="max-lg:size-12 lg:hidden 2xl:block" />
                            <span className="max-lg:hidden">Користувачі</span>
                        </li>
                    </Link>
                    <Link href={`/admin/messages`}>
                        <li
                            className={
                                pathName.includes('messages')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg max-lg:justify-center'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg max-lg:justify-center'
                            }
                        >
                            <TbMessageDots
                                size={24}
                                className="max-lg:size-12 lg:hidden 2xl:block"
                            />
                            <span className="max-lg:hidden">Повідомлення</span>
                        </li>
                    </Link>
                    <Link href={`/admin/settings`}>
                        {' '}
                        <li
                            className={
                                pathName.includes('settings')
                                    ? 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg bg-admin-page-bg max-lg:justify-center'
                                    : 'transition duration-300 p-4 text-admin-text flex items-center gap-4 text-lg hover:bg-admin-page-bg max-lg:justify-center'
                            }
                        >
                            <IoIosSettings
                                size={24}
                                className="max-lg:size-12 lg:hidden 2xl:block"
                            />
                            <span className="max-lg:hidden">Налаштування</span>
                        </li>
                    </Link>
                </ul>
            </nav>
            <div className=" flex mb-8 pl-2">
                <div className="flex items-center max-sm:flex-col max-sm:gap-4">
                    <Avatar>
                        <AvatarImage src={session.data?.user?.img!} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="max-lg:hidden max-lg:mt-8">
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
