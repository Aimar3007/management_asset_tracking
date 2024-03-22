export interface IUserAuth {
    email: string
    id: string
    portalLogin: string
    token: string
    role: string
    expires_in: number | ''
    organizationCode: string
    sessionExpiredMessage?: string
}
