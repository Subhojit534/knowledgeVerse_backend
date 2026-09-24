import IAuthService from "../../service/iauth_service.js";
import User from "../model/user.js";
import { SupabaseClient } from '@supabase/supabase-js'

export default class SupabaseAuthService implements IAuthService {
    constructor(private readonly client: SupabaseClient) { }


    public async login(email: string, password: string): Promise<User> {
        try {
            const res = await this.client.auth.signInWithPassword({ email: email, password: password })
            if (res.error) {
                return Promise.reject(res.error.message)
            }
            return res.data.user
        } catch (e) {
            return Promise.reject("")
        }

    }
    public async register(email: string, password: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    public async updateProfile(): Promise<User> {
        throw new Error("Method not implemented.");
    }
}