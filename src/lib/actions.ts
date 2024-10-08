'use server'

import { z } from 'zod'
import axios from 'axios'
import { revalidatePath, revalidateTag } from 'next/cache'

export const refresh = async (token: string) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data.access_token
    } catch (error: any) {
        console.log(`error - ${error}`)
    }
}

export const register = async (
    prevState: { message: string; path: string; success: boolean },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)

    const User = z
        .object({
            username: z.string().min(1, { message: "Це поле є обов'язковим" }),
            email: z.string().min(1, { message: "Це поле є обов'язковим" }),
            password: z.string().min(1, { message: "Це поле є обов'язковим" }),
            confirmPassword: z
                .string()
                .min(1, { message: "Це поле є обов'язковим" })
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Паролі не співпадають',
                    path: ['confirmPassword']
                })
            }
        })
        .safeParse({
            username: data.username,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        })

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/register`,
            {
                ...data
            }
        )
    } catch (error: any) {
        return User.success
            ? {
                  message: error.response.data.message.toString(),
                  path: '',
                  success: false
              }
            : {
                  message: User!.error!.errors[0].message,
                  path: User!.error!.issues[0].path[0].toString(),
                  success: false
              }
    }
    return {
        message: '',
        path: '',
        success: true
    }
}

export const addProduct = async (
    token: string,
    prevState: { message: string; success: boolean; token: string },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)
    formData.append('product_img', data.product_img)
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/products`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const refreshedToken: string = await refresh(token)
        return {
            message: 'Успішно додано',
            success: true,
            token: refreshedToken
        }
    } catch (error: any) {
        return {
            message: error?.response?.data.message.toString(),
            success: false,
            token: ''
        }
    }
}

export const editProduct = async (
    id: string,
    token: string,
    prevState: { message: string; success: boolean; token: string },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)
    formData.append('product_img', data.product_img)
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${id}?_method=PATCH`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const refreshedToken: string = await refresh(token)
        return {
            message: 'Успішно змінено',
            success: true,
            token: refreshedToken
        }
    } catch (error: any) {
        return {
            message: error.response.data.message,
            success: false,
            token: ''
        }
    }
}

export const editUser = async (
    id: string,
    token: string,
    prevState: { message: string; success: boolean; token: string },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)
    if (data.hasOwnProperty('is_admin')) {
        data.is_admin === 'true'
            ? formData.append('user', JSON.stringify({ is_admin: Number(1) }))
            : formData.append('user', JSON.stringify({ is_admin: Number(0) }))
    }
    formData.append('user_img', data.img)
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${id}?_method=PATCH`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const refreshedToken = await refresh(token)
        return {
            message: 'Успішно оновлено',
            success: true,
            token: refreshedToken
        }
    } catch (error: any) {
        return {
            message: error?.response?.data.message.toString(),
            success: false,
            token: ''
        }
    }
}

export const addUser = async (
    token: string,
    prevState: {
        message: string
        success: boolean
        token: string
        statusCode: number
        path: string
    },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)
    const User = z
        .object({
            username: z.string().min(1, { message: "Це поле є обов'язковим" }),
            email: z.string().min(1, { message: "Це поле є обов'язковим" }),
            password: z.string().min(1, { message: "Це поле є обов'язковим" })
        })
        .safeParse({
            username: data.username,
            email: data.email,
            password: data.password
        })

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/register`,
            {
                ...data
            }
        )
    } catch (error: any) {
        return User.success
            ? {
                  message: error.response.data.message.toString(),
                  success: false,
                  token: '',
                  statusCode: 413,
                  path: ''
              }
            : {
                  message: User!.error!.errors[0].message,
                  success: false,
                  token: '',
                  statusCode: 413,
                  path: User!.error!.issues[0].path[0].toString()
              }
    }
    const refreshedToken: string = await refresh(token)
    return {
        message: 'Успішно додано',
        success: true,
        token: refreshedToken,
        statusCode: 200,
        path: ''
    }
}

export const revalidateData = (path: string) => {
    revalidatePath(path, 'page')
}
export const revalidateDataByTag = (tag: string) => {
    revalidateTag(tag)
}
