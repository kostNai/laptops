import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
    const users = (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`))
        .data.users

    return NextResponse.json({ users })
}
