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
    deletedAt?: number
    city?: string
}

export interface IDMUFilter {
    city: { city: string }[]
    user: { id: number; userName: string }[]
}

export interface IUpdateUserPayload {
    id: number
    userName?: string
    deletedAt?: Date | null
    email?: string
}
