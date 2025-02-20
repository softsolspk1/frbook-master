import { addChat } from "@/api/operations"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { content, to_id } = await request.json()
    const { success, message } = await addChat(content, to_id)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}