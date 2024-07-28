import { ProductType } from '@/types/ProductType'
import axios from 'axios'

const API_LINK = 'http://127.0.0.1:8000/api'

export const getProducts = async () => {
    const res = await axios.get(`${API_LINK}/products`)
    return res?.data?.products
}

export const getProduct = async (productId: string) => {
    const res = await axios.get(`${API_LINK}/products/${productId}`)
    return res
}

export const deleteProduct = async (productId: string) => {
    const res = await axios.delete(`${API_LINK}/products/${productId}`)
    return res
}

export const getCpuList = async () => {
    const res = await axios.get(`${API_LINK}/cpu`)

    return res.data.cpu_list
}
export const getDisplayList = async () => {
    const res = await axios.get(`${API_LINK}/display`)

    return res.data.displays
}
export const getMemoryList = async () => {
    const res = await axios.get(`${API_LINK}/memories`)

    return res.data.memories
}
export const getRamList = async () => {
    const res = await axios.get(`${API_LINK}/rams`)

    return res.data.ram_list
}
export const getGraphicList = async () => {
    const res = await axios.get(`${API_LINK}/graphics`)

    return res.data.graphics
}

export const addProduct = async (formData: FormData) => {
    const data = JSON.parse(formData.getAll('product')[0].toString())
    const res = await axios.post(`${API_LINK}/products`, { ...data })

    return res
}

export const login = async (username: string, password: string) => {
    const res = await axios
        .post(`${API_LINK}/login`, {
            username,
            password
        })
        .catch((err) => err)
    return res
}

export const register = async (
    username: string,
    password: string,
    email: string
) => {
    const res = await axios
        .post(`${API_LINK}/register`, {
            username,
            password,
            email
        })
        .catch((err) => err)
    return res
}
