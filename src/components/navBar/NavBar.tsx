import Link from 'next/link'
import React from 'react'

type Props = {
	link: { path: string; title: string }
}
export default function Navbar({ link }: Props) {
	return (
		<Link
			href={link.path}
			key={link.title}
			className="hover:text-white transition duration-300 "
		>
			{link.title}
		</Link>
	)
}
