import { ProductType } from '@/types/ProductType'
import React, { ReactNode } from 'react'

type Props = {
	options: string[]
	products: ProductType[]
	name: string
	title: string
}

const filteredOptions = (
	options: string[]
) => {
	return Array.from(new Set(options))
}

export default function Filter({
	options,
	products,
	name,
	title
}: Props) {
	return (
		products && (
			<div>
				<h3 className="text-l font-bold mt-4 ">
					{title}
				</h3>
				<div>
					<div className="flex flex-col">
						{filteredOptions(
							options
						).map((option, indx) => (
							<label
								htmlFor="cpu"
								key={indx}
								className="flex gap-2"
							>
								<div>
									<input
										type="checkbox"
										name={name}
									/>
								</div>
								{option}
							</label>
						))}
					</div>
				</div>
			</div>
		)
	)
}
