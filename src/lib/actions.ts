'use server'

import { z } from 'zod'
import axios, { Axios, AxiosError } from 'axios'
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

export const editProduct = async (id: string, formData: FormData) => {
    const data = Object.fromEntries(formData)
    try {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
            {
                ...data
            }
        )
        revalidatePath('/admin/products/[name]', 'page')

        return res.data
    } catch (error: any) {
        return error
    }
}
export const editUser = async (
    id: string,
    prevState: { message: string },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)
    try {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
            {
                ...data
            }
        )

        revalidatePath('/admin/users/', 'page')

        return res
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data.message.toString())
            return { message: error.response?.data.message.toString() }
        }
        return { message: error.response.data.message.toString() }
    }
}

export const revalidateData = (path: string) => {
    revalidatePath(path, 'page')
}
export const revalidateDataByTag = (tag: string) => {
    revalidateTag(tag)
}
