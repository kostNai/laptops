'use server'

const API_LINK = 'http://127.0.0.1:8000/api'

import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { RedirectType, redirect } from 'next/navigation'
// import { revalidatePath, revalidateTag } from 'next/cache'

export const register = async (
    prevState: { message: string },
    formData: FormData
) => {
    const data = Object.fromEntries(formData)

    try {
        const res = await axios.post(`${API_LINK}/register`, {
            ...data
        })
    } catch (error: any) {
        return { message: error.response.data.message.toString() }
    }
    return redirect('/login', RedirectType.replace)
}

// export const revalidateData = (path: string) => {
//     revalidatePath(path, 'page')
//     console.log('revalidated')
// }
// export const revalidateDataByTag = (tag: string) => {
//     revalidateTag(tag)
// }
