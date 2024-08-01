import AddProductForm from '@/components/addProductForm/AddProductForm'
import { getFilteredData } from '@/lib/data'
import { CpuType } from '@/types/CpuType'
import { DisplayType } from '@/types/DisplayType'
import { GraphicType } from '@/types/GraphicType'
import { MemoryType } from '@/types/MemoryType'
import { RamType } from '@/types/RamType'
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
