"use server"

import { db } from "@/server/db"
import { type User } from "@prisma/client"

export const EditAccount = async (data:Omit<User,'email'>) => {
    try {
        const user = await db.user.update({
            where:{
                id:data.id
            },
            data:{
                ...data
            }
        })
        return user
    } catch (error) {
        throw error
    }
}