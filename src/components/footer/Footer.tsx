import Link from 'next/link'

export default function () {
	return (
		<footer className="flex shrink justify-between p-16 bg-white rounded-t-xl">
			<div>
				<Link href="/" className="hover:underline">
					Laptops by Sanya
				</Link>
			</div>
			<div>Call us: +380-66-123-45-67</div>
		</footer>
	)
}
