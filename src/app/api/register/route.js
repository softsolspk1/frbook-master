import { login, register } from "@/api/operations"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { name, email, password } = await request.json()
    const { success, message } = await register(name, password, email)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}