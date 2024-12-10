"use server"

import { db } from "@/server/db"
import { type NextRequest } from "next/server"

export async function GET( request: NextRequest ) {
    try {
        const userId =  request.nextUrl.searchParams.get("user")
        const user = await db.user.findUniqueOrThrow({where:{clerkId:userId ?? ''}})
        return new Response(JSON.stringify(user) , {status:200})
    } catch (error) {
        return new Response(JSON.stringify(error) , {status:500})
    }
}