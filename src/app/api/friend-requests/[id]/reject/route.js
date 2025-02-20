import { NextResponse } from "next/server"
import { rejectFr } from "@/api/operations"

export async function POST(request, { params }) {
    const { id } = params
    
    const { success, message } = await rejectFr(id)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })

}