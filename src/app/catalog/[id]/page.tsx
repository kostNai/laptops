import SingleProduct from '@/components/singleProduct/SingleProduct'
import { getProduct } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import React from 'react'

export default async function Page({
	params
}: {
	params: { id: string }
}) {
	const product: ProductType =
		await getProduct(params.id).then(
			(data) => {
				return data.data.product
			}
		)

	return (
		<div className="w-full h-content bg-white ">
			<SingleProduct
				product={product}
			/>
		</div>
	)
}
