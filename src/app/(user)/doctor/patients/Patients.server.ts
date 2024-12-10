"use server"

import { db } from "@/server/db"
import { type User } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const EditPatient = async (data:Omit<User,'clerkId'>) => {
    try {
        const user = await db.user.update({
            where:{
                id:data.id
            },
            data:{
                ...data
            }
        })
        revalidatePath('/doctor/patients')
        return user
    } catch (error) {
        throw error
    }
}