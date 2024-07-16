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
			className={pathName===link.path?" transition duration-300 bg-white text-text-dark px-2 rounded-lg":"hover:text-white transition duration-300 "}
		>
			{link.title}
		</Link>
	)
}
