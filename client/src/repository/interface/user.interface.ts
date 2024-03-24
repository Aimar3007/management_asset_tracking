export interface IUser {
    id: number
    userName: string
    email: string
    roleId: number
    city: string
    position?: string
    deletedAt: null
    createdAt: string
    updatedAt: null
    role: IRole
}

export interface IRole {
    id: number
    type: string
    createdAt: string
    updatedAt: null
}

export interface IUserPayload {
    page: number
    record: number
    userName?: string
    status?: string
    city?: string
}
