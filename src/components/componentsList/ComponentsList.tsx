import { ProductType } from '@/types/ProductType'
import CpuList from '@/components/cpuList/CpuList'
import DisplayList from '@/components/diplayLsit/DisplayList'
import GraphicList from '@/components/graphicList/GraphicList'
import MemoryList from '@/components/memoryList/MemoryList'
import RamList from '@/components/ramList/RamList'
import { RamType } from '@/types/RamType'
import { CpuType } from '@/types/CpuType'
import { DisplayType } from '@/types/DisplayType'
import { GraphicType } from '@/types/GraphicType'
import { MemoryType } from '@/types/MemoryType'
import TestComponent from '../testComponent/TestComponent'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
    ramList: RamType[]
    // cpuList: CpuType[]
    memoryList: MemoryType[]
    graphicList: GraphicType[]
    displayList: DisplayType[]
}

export default function ComponentsList({
    product,
    setProduct,
    ramList,
    // cpuList,
    memoryList,
    graphicList,
    displayList
}: Props) {
    return (
        <div>
            <CpuList product={product!} setProduct={setProduct} />
            <DisplayList
                product={product!}
                setProduct={setProduct}
                displayList={displayList}
            />
            <MemoryList
                product={product!}
                setProduct={setProduct}
                memoryList={memoryList}
            />
            <RamList
                product={product!}
                setProduct={setProduct}
                ramList={ramList}
            />
            <GraphicList
                product={product!}
                setProduct={setProduct}
                graphicList={graphicList}
            />
        </div>
    )
}
