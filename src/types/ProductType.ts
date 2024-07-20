import { CpuType } from './CpuType'
import { DisplayType } from './DisplayType'
import { GraphicType } from './GraphicType'
import { MemoryType } from './MemoryType'
import { RamType } from './RamType'

export type ProductType = {
	id?: number
	manufacturer: string
	price: number
	image: string
	name: string
	model: string
	color: string
	weight: number
	multimedia: string
	dimensions: string
	os: string
	description: string
	cpu_id: number
	display_id: number
	memory_id: number
	ram_id: number
	graphic_id: number
	cpu?: CpuType
	display?: DisplayType
	graphic?: GraphicType
	memory?: MemoryType
	ram?: RamType
}
