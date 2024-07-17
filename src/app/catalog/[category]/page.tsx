import React from 'react'

export default function Page({ params }: { params: { category: string } }) {
	console.log(params.category)
	return <div>My path: {params.category} </div>
}
