import { CpuType } from '@/types/CpuType'
import axios from 'axios'

const API_LINK = 'http://127.0.0.1:8000/api'

//  Login
export const login = async (username: string, password: string) => {
    const res = await axios
        .post(`${API_LINK}/login`, {
            username,
            password
        })
        .catch((err) => err)
    return res
}

// Register
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

//Get all products

export const getProducts = async () => {
    const res = await axios.get(`${API_LINK}/products`)
    return res?.data?.products
}

//Get product by id
export const getProduct = async (productId: string) => {
    const res = await axios.get(`${API_LINK}/products/${productId}`)
    return res
}

//Delete product
export const deleteProduct = async (productId: string) => {
    const res = await axios.delete(`${API_LINK}/products/${productId}`)
    return res
}

//Get Cpu list
export const getCpuList = async () => {
    const res = await axios.get(`${API_LINK}/cpu`)

    return res.data.cpu_list
}

//Get Display list
export const getDisplayList = async () => {
    const res = await axios.get(`${API_LINK}/display`)

    return res.data.displays
}

//Get Memory list
export const getMemoryList = async () => {
    const res = await axios.get(`${API_LINK}/memories`)

    return res.data.memories
}

//Get Ram list
export const getRamList = async () => {
    const res = await axios.get(`${API_LINK}/rams`)

    return res.data.ram_list
}

//Get Graphic list
export const getGraphicList = async () => {
    const res = await axios.get(`${API_LINK}/graphics`)

    return res.data.graphics
}

//Add new product
export const addProduct = async (formData: FormData, token: string) => {
    const data = JSON.parse(formData.getAll('product')[0].toString())
    const res = await axios.post(
        `${API_LINK}/products`,
        { ...data },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res
}

//Get filtered list
export const getFilteredData = async (component: string) => {
    const res = await axios.get(`${API_LINK}/get-filtered-data`, {
        params: {
            component: component
        }
    })

    return res
}

//Add new cpu
export const addNewCpu = async (newCpu: CpuType, token: string) => {
    const res = await axios.post(
        `${API_LINK}/cpu`,
        {
            ...newCpu
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res
}
