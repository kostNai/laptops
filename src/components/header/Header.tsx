'use client'

import Link from 'next/link'
import { RiMenuFill } from 'react-icons/ri'
import { MdClose } from 'react-icons/md'
import Navbar from '../navBar/NavBar'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const links = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    {
        title: 'Catalog',
        path: '/catalog'
    },
    {
        title: 'Contacts',
        path: '/contacts'
    }
]
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: session, status } = useSession()
    const pathName = usePathname()

    const logoutHandler = async () => {
        await signOut()
    }

    return (
        <header
            className={
                Boolean(session?.user?.is_admin) === true &&
                pathName.includes('admin')
                    ? 'hidden'
                    : 'flex justify-between shrink grow-0 items-center py-8 px-4 bg-header-bg 0 text-gray-400 rounded-b-xl max-sm:rounded-none'
            }
        >
            <div>
                <Link href={'/'}>Laptops by Sanya</Link>
            </div>

            <div className="flex gap-16 justify-between  max-xl:hidden">
                {links.map((link) => (
                    <Navbar link={link} key={link.title} />
                ))}
            </div>
            <div className="flex gap-4 max-xl:hidden ">
                {status === 'authenticated' && session?.user?.is_admin ? (
                    <Link
                        href={'/admin'}
                        className={
                            pathName === '/admin'
                                ? 'mr-16 transition duration-300 bg-white text-text-dark px-2 rounded-lg text-center max-xl:bg-header-bg max-xl:text-white'
                                : 'mr-16 max-xl:px-2 px-2 max-xl:hover:bg-header-bg max-xl:hover:text-white hover:text-white  max-xl:hover:rounded-lg text-center transition duration-300 '
                        }
                    >
                        Admin
                    </Link>
                ) : (
                    false
                )}
                {status === 'authenticated' ? (
                    <>
                        <Link
                            href={
                                session.user?.is_admin ? '/admin' : '/profile'
                            }
                        >
                            {session?.user?.username}
                        </Link>
                        <button onClick={logoutHandler}>Вийти</button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="hover:text-white ">
                            Login
                        </Link>
                        <Link href="register" className="hover:text-white ">
                            Register
                        </Link>
                    </>
                )}
            </div>

            {isMenuOpen && (
                <div className="absolute px-10 py-6 top-[calc(5rem)] right-16 flex  gap-4 flex-col items-start justify-center xl:hidden h-fit bg-white text-text-dark rounded-xl">
                    {links.map((link) => (
                        <Navbar link={link} key={link.title} />
                    ))}
                    <div className="flex flex-col gap-4 xl:hidden">
                        <Link
                            href="/login"
                            className="max-xl:hover:bg-header-bg max-xl:hover:text-white max-xl:px-2"
                        >
                            Login
                        </Link>
                        <Link
                            href="register"
                            className="max-xl:hover:bg-header-bg max-xl:hover:text-white max-xl:px-2"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
            {!isMenuOpen ? (
                <RiMenuFill
                    className="xl:hidden cursor-pointer text-gray-400 hover:text-white transition duration-300 "
                    size={32}
                    onClick={() => setIsMenuOpen(true)}
                />
            ) : (
                <MdClose
                    className="xl:hidden cursor-pointer text-gray-400 hover:text-white transition duration-300"
                    size={32}
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </header>
    )
}
