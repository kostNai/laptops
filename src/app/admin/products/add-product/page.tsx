import AddProductForm from '@/components/addProductForm/AddProductForm'
import React, { Suspense } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

export default async function AddProductPage() {
    return (
        <section>
            <Suspense fallback={<FadeLoader />}>
                <AddProductForm />
            </Suspense>
        </section>
    )
}
