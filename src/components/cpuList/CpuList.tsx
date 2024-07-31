'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { CpuType } from '@/types/CpuType'
import { addNewCpu, addProduct, getFilteredData } from '@/lib/data'
import { ProductType } from '@/types/ProductType'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { revalidateData } from '@/lib/actions'
import { usePathname } from 'next/navigation'
import { Label } from '../ui/label'
import CustomDailog from '../dialog/Dailog'

type Props = {
    product: ProductType
    setProduct: (product: ProductType) => void
}

export default function CpuList({ product, setProduct }: Props) {
    const [cpuList, setCpuList] = useState<CpuType[] | undefined>([])
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
    const [newCpu, setNewCpu] = useState<CpuType | null>(null)
    const session = useSession()
    const pathName = usePathname()

    const token = session.data?.user?.access_token
    useEffect(() => {
        setIsLoading(true)
        const res = getFilteredData('Cpu').then((data: any) => {
            try {
                setCpuList(data.data.cpu_list)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        })
    }, [])
    const slug = `${newCpu?.model}_${newCpu?.series}_${newCpu?.cores_value}`
    const onChangeHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCpu({ ...newCpu!, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (token && newCpu) {
            try {
                const res = await addNewCpu({ ...newCpu, slug: slug }, token)

                if (res.status === 200) {
                    toast.success('Додано успішно')
                    revalidateData(pathName)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="mt-8 py-4 px-2 border-t-2  border-solid border-gray-200  border-b-2 ">
            <div>
                <h3 className="text-xl">Процесор</h3>
                {isLoading ? (
                    <FadeLoader />
                ) : (
                    <RadioGroup
                        defaultValue="option-one"
                        className="mt-4"
                        onValueChange={(e) =>
                            setProduct({ ...product, cpu_id: e })
                        }
                    >
                        {cpuList?.map((cpu: CpuType, indx: number) => (
                            <div
                                className="flex items-center space-x-2"
                                key={indx}
                            >
                                <RadioGroupItem value={cpu.id!} id={cpu.id} />
                                <Label
                                    htmlFor={cpu.id}
                                >{`${cpu.manufacturer} ${cpu.model}`}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
            </div>
            <CustomDailog
                onChangeHandler={onChangeHanler}
                onSubmitHandler={onSubmitHandler}
            />
        </div>
    )
}
