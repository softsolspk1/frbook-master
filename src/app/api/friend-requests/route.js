import { NextResponse } from "next/server"
import { sendFr } from "@/api/operations"

export async function POST(request) {
    console.log("damm");
    const { to_id } = await request.json()
    const { success, message } = await sendFr(to_id)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}