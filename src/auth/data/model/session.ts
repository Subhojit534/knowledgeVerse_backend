export default class Session {
    constructor(public readonly accessToken: string, public readonly refreshToken: string) {}
}