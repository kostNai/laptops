import {
	getCpuList,
	getProducts
} from '@/lib/getData'
import { CpuType } from '@/types/CpuType'
import { ProductType } from '@/types/ProductType'

export default async function Filters() {
	const products: ProductType[] =
		await getProducts()
	return (
		products && (
			<div>
				<div>
					<h3>Виробник</h3>
					<div className="flex flex-col">
						{products.map(
							(
								product: ProductType
							) => (
								<label
									htmlFor="cpu"
									key={product.id}
									className="flex gap-2"
								>
									<div>
										<input
											type="checkbox"
											name="cpu"
										/>
									</div>
									{product.manufacturer}
								</label>
							)
						)}
					</div>
				</div>
			</div>
		)
	)
}
