import React from 'react'
import ProductBlock from '../productBlock/ProductBlock'
import { ProductType } from '@/types/ProductType'

type Props = {
    product: ProductType
}

export default function ProductBlockList({ product }: Props) {
    return (
        <div>
            <ProductBlock
                product={product}
                title="Назва"
                dialogTitle="Назва"
                propName="name"
                defaultValue={product.name!}
                value={product.name!}
            />
            <ProductBlock
                product={product}
                title="Опис"
                dialogTitle="Опис"
                propName="description"
                defaultValue={product.description!}
                value={product.description!}
            />
            <ProductBlock
                product={product}
                title="Виробник"
                dialogTitle="Виробник"
                propName="manufacturer"
                defaultValue={product.manufacturer!}
                value={product.manufacturer!}
            />
            <ProductBlock
                product={product}
                title="Модель"
                dialogTitle="Модель"
                propName="model"
                defaultValue={product.model!}
                value={product.model!}
            />
            <ProductBlock
                product={product}
                title="ОС"
                dialogTitle="Операційна система"
                propName="os"
                defaultValue={product.os!}
                value={product.os!}
            />
            <ProductBlock
                product={product}
                title="Колір"
                dialogTitle="Колір"
                propName="color"
                defaultValue={product.color!}
                value={product.color!}
            />
            <ProductBlock
                product={product}
                title="Розміри"
                dialogTitle="Розміри"
                propName="dimensions"
                defaultValue={product.dimensions!}
                value={product.dimensions!}
            />
            <ProductBlock
                product={product}
                title="Мультимедіа"
                dialogTitle="Мультимедіа"
                propName="multimedia"
                defaultValue={product.multimedia!}
                value={product.multimedia!}
            />
            <ProductBlock
                product={product}
                title="Маса"
                dialogTitle="Маса"
                propName="weight"
                defaultValue={product.weight?.toString()!}
                value={`${product.weight?.toString()!}г`}
            />
            <ProductBlock
                product={product}
                title="Ціна"
                dialogTitle="Ціна"
                propName="price"
                defaultValue={product.price?.toString()!}
                value={`${product.price?.toString()!}грн`}
            />
        </div>
    )
}
