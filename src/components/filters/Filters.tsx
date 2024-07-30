import { getProducts } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import Filter from './Filter.tsx/Filter'
import FadeLoader from 'react-spinners/FadeLoader'
import { Suspense } from 'react'
export default async function Filters() {
    const products: ProductType[] = await getProducts()

    return (
        <div className="">
            <h2 className="text-2xl font-bold">Фільтри:</h2>
            <div>
                <Suspense fallback={<FadeLoader />}>
                    <Filter
                        products={products}
                        options={products.map(
                            (product) => product.manufacturer!
                        )}
                        name="manufacturer"
                        title="Виробник"
                    />
                </Suspense>
            </div>
            <div>
                <Suspense fallback={<FadeLoader />}>
                    <Filter
                        products={products}
                        options={products.map((product) => product.model!)}
                        name="model"
                        title="Модель"
                    />
                </Suspense>
            </div>
            <div>
                <Suspense fallback={<FadeLoader />}>
                    <Filter
                        products={products}
                        options={products.map((product) => product.color!)}
                        name="model"
                        title="Колір"
                    />
                </Suspense>
            </div>

            <div>
                <Suspense fallback={<FadeLoader />}>
                    <Filter
                        products={products}
                        options={products.map((product) => product.dimensions!)}
                        name="model"
                        title="Розмір"
                    />
                </Suspense>
            </div>
            <div>
                <Suspense fallback={<FadeLoader />}>
                    <Filter
                        products={products}
                        options={products.map(
                            (product) => product.cpu!.manufacturer
                        )}
                        name="model"
                        title="Виробник процесора"
                    />
                </Suspense>
            </div>
        </div>
    )
}
