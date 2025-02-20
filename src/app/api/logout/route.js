import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request) {
    cookies().delete("jwt")
    return NextResponse.json(null, {status: 200})
}