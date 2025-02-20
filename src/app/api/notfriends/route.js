import { getNotFriends } from "@/api/operations"
import { NextResponse } from "next/server"

export async function GET(request) {
    const ret = await getNotFriends()
    return NextResponse.json(ret, { status: 200 })
}