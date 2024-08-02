import { ProductType } from '@/types/ProductType'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    product: ProductType
}
export default function ProductCard({ product }: Props) {
    return (
        <div className="border-gray-300 border-solid border-[calc(1px)] flex w-fit p-8 gap-8 bg-white rounded-xl hover:shadow-md hover:shadow-current transition duration-300">
            <div className="flex-1 flex flex-col gap-8">
                <div>
                    <Link
                        href={'/'}
                        className="text-xl font-normal hover:text-link-hover-color transiton duration-300"
                    >
                        {product.name}
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold">{product.price} грн</p>
                    <button className="w-fit text-sm py-[calc(4px)] px-4 bg-bg-btn text-white  hover:bg-bg-btn-hover rounded-xl transition duration-300">
                        Купити
                    </button>
                </div>
            </div>
            <div className="flex-1">
                <div className="relative object-cover h-full ">
                    <Image
                        src="/test-card-image.png"
                        alt=""
                        fill
                        sizes='"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"'
                        className="hover:cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}
