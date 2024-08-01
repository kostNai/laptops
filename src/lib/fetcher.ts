import { FilteredDataType } from '@/types/FilteredDataType'
import axios from 'axios'
import useSWR from 'swr'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const getFilteredData = (param: FilteredDataType) => {
    const { data, error, isLoading } = useSWR(
        `http://127.0.0.1:8000/api/get-filtered-data/?component=${param}`,
        fetcher
    )
    return data
}
