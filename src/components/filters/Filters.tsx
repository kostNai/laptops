import { getProducts } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import Filter from './Filter.tsx/Filter'

export default async function Filters() {
    const products: ProductType[] = await getProducts()

    return (
        <div className="">
            <h2 className="text-2xl font-bold">Фільтри:</h2>
            <div>
                <Filter
                    products={products}
                    options={products.map((product) => product.manufacturer)}
                    name="manufacturer"
                    title="Виробник"
                />
            </div>
            <div>
                <Filter
                    products={products}
                    options={products.map((product) => product.model)}
                    name="model"
                    title="Модель"
                />
            </div>
            <div>
                <Filter
                    products={products}
                    options={products.map((product) => product.color)}
                    name="model"
                    title="Колір"
                />
            </div>
            <div>
                <Filter
                    products={products}
                    options={products.map((product) => product.dimensions)}
                    name="model"
                    title="Розмір"
                />
            </div>
            <div>
                <Filter
                    products={products}
                    options={products.map(
                        (product) => product.cpu!.manufacturer
                    )}
                    name="model"
                    title="Виробник процесора"
                />
            </div>
        </div>
    )
}
