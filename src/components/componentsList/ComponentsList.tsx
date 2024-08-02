import { ProductType } from '@/types/ProductType'
import CpuList from '@/components/cpuList/CpuList'
import DisplayList from '@/components/diplayLsit/DisplayList'
import GraphicList from '@/components/graphicList/GraphicList'
import MemoryList from '@/components/memoryList/MemoryList'
import RamList from '@/components/ramList/RamList'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}

export default function ComponentsList({ product, setProduct }: Props) {
    return (
        <div>
            <CpuList product={product} setProduct={setProduct} />
            <DisplayList product={product} setProduct={setProduct} />
            <MemoryList product={product} setProduct={setProduct} />
            <RamList product={product} setProduct={setProduct} />
            <GraphicList product={product} setProduct={setProduct} />
        </div>
    )
}
