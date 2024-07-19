import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
	link: { path: string; title: string }
}
export default function Navbar({ link }: Props) {
	const pathName = usePathname()
	
	return (
		<Link
			href={link.path}
			key={link.title}
			className={pathName===link.path
				?" transition duration-300 bg-white text-text-dark px-2 rounded-lg text-center max-xl:bg-header-bg max-xl:text-white"
				:" max-xl:px-2 px-2 max-xl:hover:bg-header-bg max-xl:hover:text-white hover:text-white  max-xl:hover:rounded-lg text-center transition duration-300 "}
		>
			{link.title}
		</Link>
	)
}
