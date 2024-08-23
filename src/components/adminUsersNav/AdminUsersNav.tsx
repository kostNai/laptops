'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminUsersNav() {
    const pathName = usePathname()

    return (
        <div className="h-fit max-sm:flex max-sm:justify-center">
            <div className="h-fit flex flex-col gap-12 mt-8 max-sm:items-center max-sm:gap-4">
                <h2 className=" ml-8 text-2xl font-bold max-sm:m-0">
                    Користувачі
                </h2>
                <div className=" w-fit ml-8  max-md:flex max-md:flex-col max-md:gap-4 max-sm:m-0">
                    <Link
                        href="/admin/users"
                        className={
                            pathName === `/admin/users`
                                ? 'bg-header-bg px-4 py-2 text-white rounded-l-xl inline-block max-md:rounded-none'
                                : 'bg-white px-4 py-2 rounded-l-2xl inline-block max-md:rounded-none'
                        }
                    >
                        Список Користувачів
                    </Link>
                    <Link
                        href="/admin/users/add-user"
                        className={
                            pathName === `/admin/users/add-user`
                                ? 'bg-header-bg px-4 py-2 text-white rounded-r-xl inline-block max-md:rounded-none'
                                : 'bg-white px-4 py-2 rounded-r-2xl inline-block max-md:rounded-none'
                        }
                    >
                        Додати нового користувача
                    </Link>
                </div>
            </div>
        </div>
    )
}
