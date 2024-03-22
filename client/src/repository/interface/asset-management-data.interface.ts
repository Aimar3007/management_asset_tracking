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
    previousUser: IUser
}

export interface IUser {
    id: number
    userName: string
    email: string
    roleId: number
    city: string
    deletedAt: string | null
    createdAt: string
    updatedAt: string | null
}

export interface IAssetManagementPayload {
    page: number
    record: number
    name?: string
    description?: string
    brand?: string
    userId?: number
}
