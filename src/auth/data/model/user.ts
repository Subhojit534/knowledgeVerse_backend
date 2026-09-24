export default class User {
    public readonly last_sign_in_at: Date
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly phone: string | null,
        last_sign_in_at: Date | null
    ) {
        this.last_sign_in_at = last_sign_in_at || new Date()
    }
}