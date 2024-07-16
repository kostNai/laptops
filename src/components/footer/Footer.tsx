import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="flex shrink justify-between p-8 bg-white rounded-t-xl max-sm:rounded-none max-[450px]:flex-col max-[450px]:gap-4 max-[450px]:justify-around max-[450px]:items-center">
			<div>
				<Link href="/" className="hover:underline">
					Laptops by Sanya
				</Link>
			</div>
			<div>Call us: +380-66-123-45-67</div>
		</footer>
	)
}
