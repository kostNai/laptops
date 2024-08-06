'use server'

import { string, z } from 'zod'

const API_LINK = 'http://127.0.0.1:8000/api'

import axios from 'axios'
import { RedirectType, redirect } from 'next/navigation'
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
        const res = await axios.post(`${API_LINK}/register`, {
            ...data
        })
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

export const revalidateData = (path: string) => {
    revalidatePath(path, 'page')
}
export const revalidateDataByTag = (tag: string) => {
    revalidateTag(tag)
}
