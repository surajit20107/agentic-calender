"use client"
import { useSession } from "@descope/nextjs-sdk/client"
import { useRouter } from "next/navigation"
import React, { useEffect } from 'react'
import { Skeleton } from "../ui/skeleton"

function RedirectIfAuthenticated({children}: {children: React.ReactNode}) {
    const { isAuthenticated, isSessionLoading } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated && !isSessionLoading) {
            router.replace("/dashboard")
        }
    }, [isAuthenticated, isSessionLoading, router])

    if (isAuthenticated && isSessionLoading) {
        return (
            <div className="flex flex-col gap-3 py-8 items-center">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        )
    }

    return children
}

export default RedirectIfAuthenticated