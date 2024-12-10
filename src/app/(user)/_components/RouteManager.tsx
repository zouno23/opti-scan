"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RouteManager( {user}:{user:{role:string}} ) {
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        if(pathname && !pathname?.includes(user.role.toLocaleLowerCase()) && !(pathname.includes("edit-account") || pathname.includes ("sign"))){
            setTimeout(() => {
                router.replace(`/${user.role.toLocaleLowerCase()}`)
            },0)
        }
    }, [])
    return <></>
}