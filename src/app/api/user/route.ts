import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const user = (await axios.get(`http://127.0.0.1:8000/api/users/${id}`)).data

    return NextResponse.json({ user: user })
}
