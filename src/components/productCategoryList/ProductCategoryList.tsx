import { ProductType } from '@/types/ProductType'
import ProductCategoryCard from '../productCategoryCard/ProductCategoryCard'

const products: ProductType[] = [
	{
		title: 'Ноутбук HP Omen 17-cm2001ua [826P6EA]',
		desc: "Процесор: Intel Core i7Базова частота: 3.7Максимальна частота: 5Об’єм оперативної пам’яті: 16 ГБОб'єм накопичувача: 1 ТБСерія відеокарти: GeForce RTX 4070Об’єм пам’яті відеокарти: 8 ГБДіагональ екрану: 17.3Роздільна здатність екрану: 2560×1440Модель процесора: i7-13700HXТип матриці: IPS",
		price: 99999
	},
	{
		title: 'Ноутбук HP Omen 17-cm2001ua [826P6EA]',
		desc: "Процесор: Intel Core i7Базова частота: 3.7Максимальна частота: 5Об’єм оперативної пам’яті: 16 ГБОб'єм накопичувача: 1 ТБСерія відеокарти: GeForce RTX 4070Об’єм пам’яті відеокарти: 8 ГБДіагональ екрану: 17.3Роздільна здатність екрану: 2560×1440Модель процесора: i7-13700HXТип матриці: IPS",
		price: 99999
	},
	{
		title: 'Ноутбук HP Omen 17-cm2001ua [826P6EA]',
		desc: "Процесор: Intel Core i7Базова частота: 3.7Максимальна частота: 5Об’єм оперативної пам’яті: 16 ГБОб'єм накопичувача: 1 ТБСерія відеокарти: GeForce RTX 4070Об’єм пам’яті відеокарти: 8 ГБДіагональ екрану: 17.3Роздільна здатність екрану: 2560×1440Модель процесора: i7-13700HXТип матриці: IPS",
		price: 99999
	},
	{
		title: 'Ноутбук HP Omen 17-cm2001ua [826P6EA]',
		desc: "Процесор: Intel Core i7Базова частота: 3.7Максимальна частота: 5Об’єм оперативної пам’яті: 16 ГБОб'єм накопичувача: 1 ТБСерія відеокарти: GeForce RTX 4070Об’єм пам’яті відеокарти: 8 ГБДіагональ екрану: 17.3Роздільна здатність екрану: 2560×1440Модель процесора: i7-13700HXТип матриці: IPS",
		price: 99999
	}
]

export default function ProductCategoryList() {
	return (
		<div className='mt-16 flex flex-wrap gap-4 justify-between'>
			{products.map((product) => (
				<ProductCategoryCard product={product} key={product.title} />
			))}
		</div>
	)
}
