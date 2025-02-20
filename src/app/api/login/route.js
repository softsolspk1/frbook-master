import { NextResponse } from "next/server"
import { login } from "@/api/operations"

export async function POST(request) {

    console.log("damm");
    const { email, password } = await request.json()
    const { success, message } = await login(email, password)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}