import { Suspense } from 'react'
import Image from 'next/image'
import { ProductType } from '@/types/ProductType'
import TableForSingleProduct from '../tableForSingleProduct/TableForSingleProduct'

type Props = {
	product: ProductType
}

export default async function SingleProduct({
	product
}: Props) {
	return (
		<section className="py-16 px-8 w-full h-content">
			<div className="w-full h-[300px] grid grid-cols-3 gap-8">
				<div className="w-full h-full col-span-1 border-[1px] border-gray-300 border-solid rounded-l p-8">
					<div className="w-full h-full relative object-contain">
						<Suspense
							fallback={
								<div>Loading...</div>
							}
						>
							<Image
								src={product?.image}
								alt="Produc image"
								fill
							/>
						</Suspense>
					</div>
				</div>
				<div className="w-full h-full col-span-2  flex flex-col justify-between ps-4 py-4">
					<div>
						<h2 className="text-2xl font-bold">
							Ноутбук {product.name}
						</h2>
						<p className="text-sm text-link-hover-color">
							Є в наявності
						</p>
					</div>
					<div>
						<p className="text-2xl font-bold">
							{product.price} грн
						</p>
						<button className="mt-4 font-bold py-4 px-16 bg-yellow-400 rounded-md hover:bg-yellow-600 transition duration-300">
							Купити
						</button>
					</div>
					<div>
						<p className="font-light uppercase">
							{product.description}
						</p>
					</div>
				</div>
			</div>
			<div className="h-content">
				<h3 className="mt-12 text-2xl font-bold">
					Характеристики:
				</h3>
				<TableForSingleProduct
					product={product}
				/>
			</div>
		</section>
	)
}
