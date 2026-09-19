import type { Request, Response, NextFunction } from "express";
import { descopeClient } from "../config/descope.js";
import { ensureUser } from "../repositories/user.repository.js";

export type AuthContext = {
    authUserId: string,
    email?: string,
    name?: string,
    userId: string,
    token: Record<string, unknown>
}

declare global {
    namespace Express {
        interface Request {
            auth?: AuthContext
        }
    }
}

export async function requireSession(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization
    const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        const authInfo = descopeClient.validateSession(token)
        const claims = (await authInfo).token as Record<string, unknown>
        const authUserId =  claims.sub as string || ""

        if (!authInfo) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const email  =  typeof claims.email === "string" ? claims.email : undefined
        const user = await ensureUser({ authUserId, email })

        req.auth = {
            authUserId,
            email,
            name: typeof claims.name === "string" ? claims.name : undefined,
            userId: user.id,
            token: claims
        }
        next()
    } catch (error) {
        console.error((error as Error).message);
        return res.status(401).json({
            success: false,
            message: "Session expired"
        })
    }
}
