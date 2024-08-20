import React from 'react'
import ProductBlock from '../productBlock/ProductBlock'
import { ProductType } from '@/types/ProductType'

type Props = {
    product: ProductType
    updateSession: (token: string) => void
}
// const productFields = [
//     { title: 'Назва', propName: 'name' },
//     { title: 'Опис', propName: 'description' },
//     { title: 'Виробник', propName: 'manufacturer' },
//     { title: 'Модель', propName: 'model' },
//     { title: 'Операційна система', propName: 'os' },
//     { title: 'Колір', propName: 'color' },
//     { title: 'Розміри', propName: 'dimensions' },
//     { title: 'Мультимедіа', propName: 'multimedia' },
//     { title: 'Маса', propName: 'weight' },
//     { title: 'Ціна', propName: 'price' }
// ]
export default function ProductBlockList({ product, updateSession }: Props) {
    return (
        <div>
            <ProductBlock
                product={product}
                title="Назва"
                dialogTitle="Назва"
                propName="name"
                defaultValue={product.name!}
                value={product.name!}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="Опис"
                dialogTitle="Опис"
                propName="description"
                defaultValue={product.description!}
                value={product.description!}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="Виробник"
                dialogTitle="Виробник"
                propName="manufacturer"
                defaultValue={product.manufacturer!}
                value={product.manufacturer!}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="Модель"
                dialogTitle="Модель"
                propName="model"
                defaultValue={product.model!}
                value={product.model!}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="ОС"
                dialogTitle="Операційна система"
                propName="os"
                defaultValue={product.os!}
                value={product.os!}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="Колір"
                dialogTitle="Колір"
                propName="color"
                defaultValue={product.color!}
                value={product.color!}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="Розміри"
                dialogTitle="Розміри"
                propName="dimensions"
                defaultValue={product.dimensions!}
                value={product.dimensions!}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="Мультимедіа"
                dialogTitle="Мультимедіа"
                propName="multimedia"
                defaultValue={product.multimedia!}
                value={product.multimedia!}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="Маса"
                dialogTitle="Маса"
                propName="weight"
                defaultValue={product.weight?.toString()!}
                value={`${product.weight?.toString()!}г`}
                updateSession={updateSession}
            />
            <ProductBlock
                product={product}
                title="Ціна"
                dialogTitle="Ціна"
                propName="price"
                defaultValue={product.price?.toString()!}
                value={`${product.price?.toString()!}грн`}
                updateSession={updateSession}
            />
        </div>
    )
}
