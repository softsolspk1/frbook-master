import { completeVer } from "@/api/operations"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { otp } = await request.json()
    const { success, message } = await completeVer(otp)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}