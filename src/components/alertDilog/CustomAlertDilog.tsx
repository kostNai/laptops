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

type Props = {
    confirmDeleteProductHandler: () => void
    deleteProductHandler: (productId: string) => void
    product: ProductType
}

export default function CustomAlertDilog({
    confirmDeleteProductHandler,
    deleteProductHandler,
    product
}: Props) {
    return (
        <div className="flex items-center">
            <AlertDialog>
                <AlertDialogTrigger
                    onClick={confirmDeleteProductHandler}
                    className="text-red-400 text-sm hover:underline"
                >
                    Видалити
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
