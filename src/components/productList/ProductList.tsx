import { ProductType } from '@/types/ProductType'
import React from 'react'
import ProductCard from '../productCard/ProductCard'

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
export default function ProductList() {
	return (
		<div className="my-16 flex flex-wrap  justify-between gap-8 max-xl:justify-center">
			{products.map((product, indx) => (
				<ProductCard product={product} key={indx} />
			))}
		</div>
	)
}
