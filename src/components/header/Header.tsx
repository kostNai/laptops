import Link from 'next/link'
import { RiMenuFill } from 'react-icons/ri'
import Navbar from '../navBar/NavBar'

const links = [
	{ title: 'Home', path: '/' },
	{ title: 'About', path: '/about' },
	{ title: 'Catalog', path: '/catalog' },
	{ title: 'Contacts', path: '/contacts' },
	{ title: 'Login', path: '/login' },
	{ title: 'Register', path: '/register' }
]
export default function Header() {
	return (
		<header className="mt8 mx-32 flex justify-between items-center py-8 px-4 bg-gray-600 text-white rounded-b-xl">
			<div className="shrink">
				<Link href={'/'}>Laptops by Sanya</Link>
			</div>

			<div className="flex gap-16 justify-between grow max-xl:hidden">
				{links.map((link) => (
					<Navbar link={link} />
				))}
			</div>

			<div className="absolute top-16 right-0 flex gap-4 flex-col xl:hidden">
				{links.map((link) => (
					<Navbar link={link} />
				))}
			</div>
			<RiMenuFill className="xl:hidden " size={32} />
		</header>
	)
}
