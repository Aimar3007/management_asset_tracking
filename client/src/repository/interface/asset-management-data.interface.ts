import { IUser } from './user.interface'

export interface IAssetManagement {
    id: number
    name: string
    description: string
    brand: string
    serialNumber: string
    condition: string
    purchaseDate: string
    userId: number
    previousUserId: number
    notes: string | null
    lastDateOfRepair: string | null
    image: string | null
    reasonToRemoveAssets: string | null
    deletedAt: string | null
    createdBy: string | null
    updatedBy: string | null
    deletedBy: string | null
    createdAt: string
    updatedAt: string | null
    user: IUser
    dateOfUse?: string
    previousUser: IUser
    repairHistory?: null
}

export interface IAssetManagementPayload {
    page: number
    record: number
    name?: string
    description?: string
    brand?: string
    userId?: number
}

export interface IDAMFilter {
    brand: { brand: string }[]
    name: { name: string }[]
    user: { id: number; userName: string }[]
}
