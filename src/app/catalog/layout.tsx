import Link from 'next/link'

export default function CatalogLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<section className="h-max w-full">
			<div className="mt-8 py-4 border-b-[1px] border-solid border-gray-300">
				<h2 className="text-3xl ">Купити ноутбуки в Україні</h2>
			</div>
			<div className='grid grid-cols-4'>
				<div className='col-span-1'> Filters</div>
				<div className='col-span-3'>
					{children}
				</div>
			</div>
		</section>
	)
}
