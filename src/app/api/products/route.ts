import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const products = (await axios.get('http://127.0.0.1:8000/api/products'))
        .data.products

    return NextResponse.json({ products })
}
