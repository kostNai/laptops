import { FilteredDataType } from '@/types/FilteredDataType'
import axios from 'axios'
import useSWR, { mutate } from 'swr'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const mutateData = (url: string) => {
    mutate(url)
}

export const getFilteredData = (param: FilteredDataType) => {
    const { data, error, isLoading } = useSWR(
        `http://127.0.0.1:8000/api/get-filtered-data/?component=${param}`,
        fetcher,
        { revalidateIfStale: true, revalidateOnMount: true }
    )
    return data
}
export const getUser = (id: string) => {
    const { data, error, isLoading } = useSWR(
        `http://127.0.0.1:8000/api/users/${id}`,
        fetcher,
        { revalidateIfStale: true, revalidateOnMount: true }
    )
    return data
}
export const getProduct = (id: string) => {
    const { data, error, isLoading } = useSWR(
        `http://127.0.0.1:8000/api/products/${id}`,
        fetcher,
        { revalidateIfStale: true, revalidateOnMount: true }
    )
    return data?.product
}

export const revalidate = (param: string) => {
    mutate(`http://127.0.0.1:8000/api/get-filtered-data/?component=${param}`)
}
