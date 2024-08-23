import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { getServerSession } from 'next-auth'

import Providers from '@/components/SessionProvider'
import { authConfig } from './api/auth/[...nextauth]/config'
import { Toaster } from 'sonner'

const inter = Inter({
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'Laptops by Sanya',
    description: 'Laptops from USA'
}

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getServerSession(authConfig)

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers session={session}>
                    <div className="min-h-screen flex flex-col justify-between mx-32 max-xl:mx-8 max-sm:px-0 max-md:mx-0">
                        <Header />
                        <div className="h-full grow">{children}</div>
                        <Toaster position="top-right" richColors />
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    )
}
