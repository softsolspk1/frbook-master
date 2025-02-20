import { createPost, getPosts } from "@/api/operations"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { title, content, image, video } = await request.json()
    const { success, message } = await createPost(title, content, image, video)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}

export async function GET(request) {
    const ret = await getPosts()
    return NextResponse.json(ret, { status: 200 })
}