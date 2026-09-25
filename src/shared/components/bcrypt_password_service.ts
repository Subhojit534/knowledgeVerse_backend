import bcrypt from "bcrypt"

export function hashPassword(rawPassword: string): Promise<string> {
    return bcrypt.hash(rawPassword, 10)
}

export function comparePassword(rawPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, hash)
}

