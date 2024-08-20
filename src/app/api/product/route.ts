import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const product = (
        await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
    ).data.product

    return NextResponse.json({ product })
}

export async function DELETE(request: NextRequest) {
    console.log('request')
    const { id, token } = await request.json()
    try {
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
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
