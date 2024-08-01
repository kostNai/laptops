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
    const ramList: RamType[] = await (
        await getFilteredData('Ram')
    ).data.ram_list
    // const cpuList: CpuType[] = await (
    //     await getFilteredData('Cpu')
    // ).data.cpu_list
    const memoryList: MemoryType[] = await (
        await getFilteredData('Memory')
    ).data.memory_list
    const graphicList: GraphicType[] = await (
        await getFilteredData('Graphic')
    ).data.graphic_list
    const displayList: DisplayType[] = await (
        await getFilteredData('Display')
    ).data.display_list

    return (
        <section>
            <Suspense fallback={<FadeLoader />}>
                <AddProductForm
                    ramList={ramList}
                    // cpuList={cpuList}
                    memoryList={memoryList}
                    graphicList={graphicList}
                    displayList={displayList}
                />
            </Suspense>
        </section>
    )
}
