import React from 'react'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)
export default function TestComponent() {
    const { data, error, isLoading } = useSWR(
        'http://127.0.0.1:8000/api/get-filtered-data/?component=Cpu',
        fetcher
    )
    return (
        <div className="text-3xl font bold">Test Test Test Test Test Test</div>
    )
}
