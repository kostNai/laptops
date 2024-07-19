import Image from 'next/image'

export default function SingleProduct() {
	return (
		<section className="pt-16">
			<div className="w-full h-64 grid grid-cols-3 gap-8">
				<div className="w-full h-full col-span-1 border-r-[1px] border-gray-300 border-solid p-8">
					<div className="w-full h-full relative object-contain">
						<Image
							src="https://krababs-bucket.s3.amazonaws.com/laptops/test-laptop.png"
							alt=""
							fill
						/>
					</div>
				</div>
				<div className="w-full h-full col-span-2 border-l-[1px] border-gray-300 border-solid"></div>
			</div>
		</section>
	)
}
