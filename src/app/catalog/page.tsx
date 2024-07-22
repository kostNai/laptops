import Filters from '@/components/filters/Filters'
import ProductCategoryList from '@/components/productCategoryList/ProductCategoryList'
import { Suspense } from 'react'

export default function CatalogPage() {
	return (
		<section className="h-full w-full">
			<div className="mt-8 py-4 border-b-[1px] border-solid border-gray-300">
				<h2 className="text-3xl ">
					Купити ноутбуки в Україні
				</h2>
			</div>
			<div className="grid grid-cols-4 gap-8">
				<div className="col-span-1 mt-16 bg-white">
					<Filters />
				</div>
				<div className="col-span-3">
					<div>
						<Suspense
							fallback={
								<div>
									Suspense loading...
								</div>
							}
						>
							<ProductCategoryList />
						</Suspense>
					</div>
				</div>
			</div>
		</section>
	)
}
