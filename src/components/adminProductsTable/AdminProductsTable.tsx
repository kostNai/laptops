import { getProducts } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import { Button } from '@/components/ui/button'

export default async function AdminProductsTable() {
    const products = await getProducts()

    return (
        <div className="mt-16 px-8">
            <table className="w-full table-fixed">
                <thead className="bg-body-bg ">
                    <tr>
                        <th className="text-center py-1">Назва продукту</th>
                        <th className="text-center p-1">Ціна</th>
                        <th className="text-center p-1">Продажі(шт)</th>
                        <th className="text-center p-1">Доданий</th>
                        <th className="text-center p-1+">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {products.map((product: ProductType) => (
                        <tr
                            key={product.id}
                            className="hover:bg-header-bg hover:bg-opacity-50 hover:text-white hover:cursor-pointer transition duratoin-300"
                        >
                            <td className="text-center p-0">{product.name}</td>
                            <td className="text-center p-0">
                                {product.price} грн
                            </td>
                            <td className="text-center p-0">
                                {product.sales_count}
                            </td>
                            <td className="text-center p-0">
                                {product.created_at}
                            </td>
                            <td className="text-center p-0">
                                <div className="w-full flex gap-8">
                                    <Button
                                        variant="link"
                                        className="text-yellow-400"
                                    >
                                        Змінити
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="text-red-400"
                                    >
                                        Видалити
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
