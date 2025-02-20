import { createArticle, getArticles } from "@/api/operations"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { title, content, tags, image, description, author_name, pdf } = await request.json()
    const { success, message } = await createArticle(title, content, image, tags, description, author_name, pdf)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}

export async function GET(request) {
    const ret = await getArticles()
    return NextResponse.json(ret, { status: 200 })
}