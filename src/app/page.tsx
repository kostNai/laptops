import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	return (
		<section className="mt-8 flex gap-8 h-2/3 max-lg:flex-col max-lg:h-screen max-lg:gap-2">
			<div className="flex-1 flex flex-col gap-8 pt-16">
				<h1 className="text-5xl font-bold">
					Потрібні якісні та недорогі
					ноутбуки з США? Ти там де
					треба!
				</h1>
				<p>
					Lorem ipsum dolor sit amet
					consectetur adipisicing elit.
					Inventore iste minima ut, et
					aliquid dolorem quidem
					perspiciatis vel iure? Quis,
					quidem consequuntur temporibus
					architecto perspiciatis nihil?
					Magni quaerat deleniti quidem.
				</p>
				<div className="flex gap-4">
					<Link
						href={'/catalog'}
						className="py-4 px-8 bg-cyan-700 text-white rounded-xl hover:bg-cyan-950 transition duration-300"
					>
						В каталог
					</Link>
					<Link
						href={'/about'}
						className="py-4 px-8 bg-white rounded-xl hover:underline"
					>
						Про нас
					</Link>
				</div>
			</div>
			<div className="relative flex-1 flex justify-center px-32 py-16 max-xl:p-0  max-lg:h-1/2 max-md:hidden">
				<div className="relative object-contain max-lg:w-2/3 h-full">
					<Image
						src="/title-img.png"
						alt=""
						fill
					/>
				</div>
			</div>
		</section>
	)
}
