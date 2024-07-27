import { CpuType } from './CpuType'
import { DisplayType } from './DisplayType'
import { GraphicType } from './GraphicType'
import { MemoryType } from './MemoryType'
import { RamType } from './RamType'

export type ProductType = {
    id?: number
    manufacturer?: string
    price?: number
    image?: string
    name?: string
    model?: string
    color?: string
    weight?: number
    multimedia?: string
    dimensions?: string
    os?: string
    description?: string
    sales_count?: number
    cpu_id?: string
    display_id?: string
    memory_id?: string
    ram_id?: string
    graphic_id?: string
    cpu?: CpuType
    display?: DisplayType
    graphic?: GraphicType
    memory?: MemoryType
    ram?: RamType
    created_at?: string
}
