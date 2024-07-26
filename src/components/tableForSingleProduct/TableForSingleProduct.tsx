import { ProductType } from '@/types/ProductType'
import React from 'react'

type Props = {
    product: ProductType
}

export default function TableForSingleProduct({ product }: Props) {
    return (
        <table className="h-full single-product-table">
            <tbody className="border-t-[1px] border-solid border-gray-300">
                <tr>
                    <th>Назва</th>
                    <td>{product.name}</td>
                </tr>
                <tr>
                    <th>Колір</th>
                    <td>{product.color}</td>
                </tr>

                <tr>
                    <th>Тип пристрою</th>
                    <td>Ноутбук</td>
                </tr>
                <tr>
                    <th>Кількість ядер процесора</th>
                    <td>{product.cpu?.cores_value}</td>
                </tr>
                <tr>
                    <th>Виробник процесора</th>
                    <td>{product.cpu?.manufacturer}</td>
                </tr>
                <tr>
                    <th>Серія процесора</th>
                    <td>{product.cpu?.series}</td>
                </tr>
                <tr>
                    <th>Модель процесора</th>
                    <td>{product.cpu?.model}</td>
                </tr>
                <tr>
                    <th>Діагональ екрану</th>
                    <td>{product.display?.size}</td>
                </tr>
                <tr>
                    <th>Покриття екрану</th>
                    <td>{product.display?.cover}</td>
                </tr>
                <tr>
                    <th>Тип матриці</th>
                    <td>{product.display?.matrix}</td>
                </tr>
                <tr>
                    <th>Об'єм оперативної пам'яті</th>
                    <td>{product.ram?.memory}</td>
                </tr>
                <tr>
                    <th>Тип оперативної пам'яті</th>
                    <td>{product.ram?.type}</td>
                </tr>
                <tr>
                    <th>Операційна система</th>
                    <td>{product.os}</td>
                </tr>
                <tr>
                    <th>Серія відеокарти</th>
                    <td>{product.graphic?.series}</td>
                </tr>
                <tr>
                    <th>Тип відеокарти</th>
                    <td>{product.graphic?.type}</td>
                </tr>
                <tr>
                    <th>Габарити</th>
                    <td>{product.dimensions}</td>
                </tr>
                <tr>
                    <th>Маса</th>
                    <td>{product.weight}</td>
                </tr>
            </tbody>
        </table>
    )
}
