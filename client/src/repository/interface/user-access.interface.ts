export interface IUserAccess {
    role: string
    roleDescription: string
    isActive: boolean
    access: {
        create: boolean
        update: boolean
        delete: boolean
    }
}
