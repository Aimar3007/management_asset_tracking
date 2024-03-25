import { IAssetManagement } from './asset-management-data.interface'
import { IUser } from './user.interface'

export interface ITransactionAsset {
    id: number
    userId: number
    assetId: number
    statusTransactionAssetId: number
    reasonRequest: string
    reasonReject: string
    manageBy: number
    createdAt: string
    updatedAt: string
    typeTransactionAssetId: number
    user?: IUser
    manageByUser?: IUser
    asset?: IAssetManagement
    type?: ITransactionType
    statusTransaction?: ITransactionType
}

export interface ITransactionType {
    id: number
    type: string
    createdAt: string
    updatedAt: string
}

export interface IGetTransactionAssetPayload {
    page: number
    record: number
    description?: string
    typeTransactionAssetId?: number
    statusTransactionAssetId?: number
    userId?: string
}

export interface ICrateTransactionAssetpayload {
    userId: number
    assetId: number
    reasonRequest: string
    typeTransactionAssetId: number
}

export interface IUpdateTransactionAssetPayload {
    id: number
    userId?: number
    assetId?: number
    typeTransactionAssetId?: number
    statusTransactionAssetId?: number
    reasonRequest?: string
    reasonReject?: string
    deletedAt?: string
}

export interface IDTAFilter {
    user: {
        id: number
        userName: string
    }[],
    typeTransactionAsset: ITransactionType[]
    statusTransactionAsset: ITransactionType[]
}
