'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminUsersNav() {
    const pathName = usePathname()

    return (
        <div className="h-fit">
            <div className="h-fit flex flex-col gap-12 mt-8">
                <h2 className=" ml-8 text-2xl font-bold">Користувачі</h2>
                <div className=" w-fit ml-8   ">
                    <Link
                        href="/admin/users"
                        className={
                            pathName === `/admin/users`
                                ? 'bg-header-bg px-4 py-2 text-white rounded-l-xl inline-block'
                                : 'bg-white px-4 py-2 rounded-l-2xl inline-block'
                        }
                    >
                        Список Користувачів
                    </Link>
                    <Link
                        href="/admin/users/add-user"
                        className={
                            pathName === `/admin/users/add-user`
                                ? 'bg-header-bg px-4 py-2 text-white rounded-r-xl inline-block'
                                : 'bg-white px-4 py-2 rounded-r-2xl inline-block'
                        }
                    >
                        Додати нового користувача
                    </Link>
                </div>
            </div>
        </div>
    )
}
