'use server'

import { z } from 'zod'
import axios from 'axios'
import { revalidatePath, revalidateTag } from 'next/cache'

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
    prevState: { message: string; success: boolean },
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
        return { message: 'Успішно додано', success: true }
    } catch (error: any) {
        return {
            message: error?.response?.data.message.toString(),
            success: false
        }
    }
}

export const editProduct = async (
    id: string,
    token: string,
    prevState: { message: string; success: boolean },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)
    console.log(data)
    formData.append('product_img', data.file)
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
        return { message: 'Успішно змінено', success: true }
    } catch (error: any) {
        return { message: error.response.data.message, success: false }
    }
}

export const editUser = async (
    id: string,
    token: string,
    prevState: { message: string; success: boolean },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)
    console.log(data)
    formData.append('user_img', data.user_img)
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
        return { message: 'Успішно оновлено', success: true }
    } catch (error: any) {
        return {
            message: error?.response?.data.message.toString(),
            success: false
        }
    }
}

export const revalidateData = (path: string) => {
    revalidatePath(path, 'page')
}
export const revalidateDataByTag = (tag: string) => {
    revalidateTag(tag)
}
