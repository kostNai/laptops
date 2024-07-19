'use client'

import { ProductType } from '@/types/ProductType'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
	product: ProductType
}

export default function ProductCategoryCard({
	product
}: Props) {
	const pathName = usePathname()
	return (
		<div className="flex flex-col items-center justify-between w-[250px] h-fit gap-4 p-4 bg-white border-solid border-gray-300 border-[calc(1px)] rounded-xl hover:shadow-md hover:shadow-current transition duration-300">
			<div className="">
				<Image
					src="/test-card-image.png"
					alt=""
					width={100}
					height={50}
				/>
			</div>
			<div className="flex flex-col items-start mt-8  w-full">
				<div className="">
					<Link
						href={`${pathName}/${product.id}`}
						className="hover:text-link-hover-color transition duration-300"
					>
						{product.name}
					</Link>
				</div>
				<div className="w-full mt-8 flex flex-col gap-2">
					<p className="font-bold text-xl">
						{product.price} грн
					</p>
					<div>
						<button className="w-fit text-sm py-[calc(4px)] px-4 bg-bg-btn text-white  hover:bg-bg-btn-hover rounded-xl transition duration-300">
							Купити
						</button>
					</div>
				</div>
				<div className="mt-4 text-xs font-light text-link-hover-color">
					<p>Є в наявності</p>
				</div>
			</div>
		</div>
	)
}
