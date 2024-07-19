import SingleProduct from '@/components/singleProduct/SingleProduct'
import React from 'react'

export default function Page({
	params
}: {
	params: { id: string }
}) {
	console.log(params.id)
	return (
		<div className="w-full h-full bg-white">
			<SingleProduct />
		</div>
	)
}
