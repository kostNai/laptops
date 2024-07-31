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
import { Button } from '../ui/button'
import { ProductType } from '@/types/ProductType'

type Props = {
    confirmDeleteProductHandler: () => void
    deleteProductHandler: (productId: string) => void
    setIsChangeProduct: (isChangeProduct: boolean) => void
    product: ProductType
}

export default function CustomAlertDilog({
    confirmDeleteProductHandler,
    deleteProductHandler,
    setIsChangeProduct,
    product
}: Props) {
    return (
        <div className="flex items-center">
            <AlertDialog>
                <AlertDialogTrigger className="text-red-400 text-sm hover:underline">
                    <Button
                        variant="link"
                        className="text-red-400"
                        onClick={confirmDeleteProductHandler}
                    >
                        Видалити
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Ви дійсно бажаєте видалити даний продукт?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setIsChangeProduct(false)}
                        >
                            Відмінити
                        </AlertDialogCancel>
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
