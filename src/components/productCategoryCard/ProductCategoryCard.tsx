import { ProductType } from '@/types/ProductType'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	product: ProductType
}

export default function ProductCategoryCard({ product }: Props) {
	return (
		<div className="flex flex-col items-center justify-between w-fit h-fit gap-4 p-4 bg-white">
			<div className="relative object-contain h-full flex-1">
				<Image
					src="/test-card-image.png"
					alt=""
					fill
					sizes='"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"'
				/>
			</div>

			<div className="lex-1 flex text-left">
				<Link href={`/${product.title}`}>{product.title}</Link>
			</div>
			<div className="lex-1">
				<p>{product.price}</p>
				<div>
					<button>Купити</button>
				</div>
			</div>
			<div className="lex-1">
				<p>Є в наявності</p>
			</div>
		</div>
	)
}
