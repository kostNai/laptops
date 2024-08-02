import { CpuType } from '@/types/CpuType'
import { DisplayType } from '@/types/DisplayType'
import { GraphicType } from '@/types/GraphicType'
import { MemoryType } from '@/types/MemoryType'
import { RamType } from '@/types/RamType'
import { FormEvent } from 'react'

const onSubmitHandler = async (
    e: FormEvent,
    token: string,
    newComponent: CpuType | DisplayType | RamType | MemoryType | GraphicType
) => {
    e.preventDefault()

    // if (token && newComponent) {
    //     if(newComponent instanceof CpuType)
    //     try {
    //         const res = await addNewCpu({ ...newCpu, slug: slug }, token)
    //         if (res.status === 200) {
    //             toast.success('Додано успішно')
    //             revalidate('Cpu')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}
