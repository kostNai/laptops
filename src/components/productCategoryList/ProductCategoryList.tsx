import { ProductType } from '@/types/ProductType'
import ProductCategoryCard from '../productCategoryCard/ProductCategoryCard'
import { getProducts } from '@/lib/getData'
import { Suspense } from 'react'

export default async function ProductCategoryList() {
	const products: ProductType[] =
		await getProducts().then((data) => {
			console.log(data.data)
			return data.data.products
		})
	console.log(products)
	return (
		<div className="mt-16 flex flex-wrap gap-4 justify-between">
			<Suspense
				fallback={<div>Loading...</div>}
			>
				{products &&
					products.map((product) => (
						<ProductCategoryCard
							product={product}
							key={product.id}
						/>
					))}
			</Suspense>
		</div>
	)
}
