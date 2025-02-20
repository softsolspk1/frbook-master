import { getChats } from "@/api/operations"
import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    // Get the to_id from the query parameters
    const to_id = searchParams.get("to_id");

    // get to_id from request.query
    const ret = await getChats(to_id)
    return NextResponse.json(ret, { status: 200 })
}