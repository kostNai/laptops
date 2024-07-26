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
