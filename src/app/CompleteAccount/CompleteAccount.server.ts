"use server"

import { db } from "@/server/db"
import { type User } from "@prisma/client"


export const completeAccount = async (data:Omit<User,'id'>) => {
    try {
        const user = await db.user.create({data:{
            ...data
        }})
        return user
    } catch (error) {
        throw error        
    }
}