
import { addComment, getComments } from "@/api/operations"
import { NextResponse } from "next/server"

export async function POST(request, { params }) {
    const { id } = params
    const { content } = await request.json()

    const { success, message } = await addComment(id, content)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}


export async function GET(request, { params }) {
    const { id } = params

    var data = await getComments(id)
    return NextResponse.json(data, { status: 200 })
}