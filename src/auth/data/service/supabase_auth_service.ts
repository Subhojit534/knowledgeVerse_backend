import IAuthService from "../../service/iauth_service.js";
import User from "../model/user.js";
import { SupabaseClient } from '@supabase/supabase-js'

export default class SupabaseAuthService implements IAuthService {
    constructor(private readonly client: SupabaseClient) { }


    public async login(email: string, password: string): Promise<User> {
        
    }
    register(email: string, password: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateProfile(): Promise<User> {
        throw new Error("Method not implemented.");
    }
}