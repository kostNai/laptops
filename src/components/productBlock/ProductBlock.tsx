import { ProductType } from '@/types/ProductType'
import EditProuctDialog from '../editProductDilog/EditProuctDialog'

type Props = {
    product: ProductType
    title: string
    dialogTitle: string
    propName: string
    defaultValue: string
    value: string
    updateSession: (token: string) => void
}

export default function ProductBlock({
    product,
    title,
    propName,
    dialogTitle,
    defaultValue,
    value,
    updateSession
}: Props) {
    return (
        <div className="mt-8 flex flex-col items-start border-b-[1px] border-gray-300 border-solid max-sm:items-center">
            <p>
                <span className="opacity-60">{title} - </span>
                {value}
            </p>
            <EditProuctDialog
                title={dialogTitle}
                propName={propName}
                defaultValue={defaultValue}
                product={product}
                updateSession={updateSession}
            />
        </div>
    )
}
