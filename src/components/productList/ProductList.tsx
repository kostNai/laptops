import { ProductType } from '@/types/ProductType'
import React from 'react'
import ProductCard from '../productCard/ProductCard'
import { getProducts } from '@/lib/data'

export default async function ProductList() {
	return (
		<div className="my-16 flex flex-wrap  justify-between gap-8 max-xl:justify-center">
			{/* {products &&
				products.map(
					(product, indx) => (
						<ProductCard
							product={product}
							key={indx}
						/>
					)
				)} */}
		</div>
	)
}
