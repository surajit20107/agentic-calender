import { getPoll } from "../db/pool.js"

export type User = {
    id: string,
    auth_user_id: string,
    email: string | null,
    created_at: Date,
}

export async function ensureUser(input: {
    authUserId: string,
    email?: string,
}): Promise<User> {
    const result = await getPoll().query<User>(
        `
            INSERT INTO users (auth_user_id, email)
            VALUES ($1, $2)
            ON CONFLICT (auth_user_id) DO UPDATE
            SET email = COALESCE(EXCLUDED.email, users.email)
            RETURNING id, auth_user_id, email, created_at
        `, [input.authUserId, input.email]
    )
    return result.rows[0]
}
