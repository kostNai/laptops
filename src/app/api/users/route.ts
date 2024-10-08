import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page: string = searchParams.get('page')!
    const { data, current_page, total } = (
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`)
    ).data.users

    return NextResponse.json({
        data,
        current_page,
        total
    })
}
export async function DELETE(request: NextRequest) {
    const { id, token } = await request.json()
    try {
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return NextResponse.json({ response: res.data })
    } catch (error: any) {
        return NextResponse.json(
            { response: error?.response?.data?.message },
            { status: 401 }
        )
    }
}
