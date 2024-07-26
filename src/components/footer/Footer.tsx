'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
    const session = useSession()
    const pathName = usePathname()
    return (
        <footer
            className={
                Boolean(session?.data?.user?.is_admin) === true &&
                pathName.includes('/admin')
                    ? 'hidden'
                    : 'flex shrink grow-0 justify-between p-8 text-white bg-header-bg rounded-t-xl max-sm:rounded-none max-[450px]:flex-col max-[450px]:gap-4 max-[450px]:justify-around max-[450px]:items-center'
            }
        >
            <div>
                <Link href="/" className="hover:underline">
                    Laptops by Sanya
                </Link>
            </div>
            <div>Call us: +380-66-123-45-67</div>
        </footer>
    )
}
