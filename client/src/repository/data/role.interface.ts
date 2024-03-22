export interface IRole {
    role: string
    roleDescription: string
    access: IRoleAccess
}

export interface IRoleAccess {
    create: boolean
    update: boolean
    delete: boolean
}
