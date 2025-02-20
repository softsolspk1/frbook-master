
import { likePost } from "@/api/operations"
import { NextResponse } from "next/server"

export async function POST(request, { params }) {
    const { id } = params
    console.log(id);
    const { success, message } = await likePost(id)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}