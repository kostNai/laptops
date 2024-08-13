'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { ProductType } from '@/types/ProductType'
import { RiDeleteBin6Line } from 'react-icons/ri'

type Props = {
    deleteProductHandler: (productId: string) => void
    product: ProductType
}

export default function CustomAlertDilog({
    deleteProductHandler,
    product
}: Props) {
    return (
        <div className="flex items-center">
            <AlertDialog>
                <AlertDialogTrigger className="text-red-400 text-sm hover:underline hover:text-red-600 transition duration-300 flex gap-2 items-center">
                    Видалити
                    <RiDeleteBin6Line />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Ви дійсно бажаєте видалити даний продукт?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Будьте уважні! Ви видалите цей продукт назавжди.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Відмінити</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                deleteProductHandler(product.id?.toString()!)
                            }
                        >
                            Видалити
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
