import User from "../data/model/user.js";

export default interface IAuthService {
    login(email: string, password: string): Promise<User>
    register(email: string, password: string): Promise<User>
    updateProfile(): Promise<User>
}