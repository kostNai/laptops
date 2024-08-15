import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const users = (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`))
        .data.users

    return NextResponse.json({ users })
}
export async function DELETE(request: NextRequest) {
    const { id } = await request.json()
    const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
    )

    return NextResponse.json({ res: res.data })
}
