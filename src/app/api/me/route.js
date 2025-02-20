import { NextResponse } from "next/server"
import { updateMe } from "@/api/operations"

export async function POST(request) {
    console.log("damm");
    const { profile_pic } = await request.json()
    const { success, message } = await updateMe(profile_pic)
    if (success) {
        return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(message, { status: 400 })
}