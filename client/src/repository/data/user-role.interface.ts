import { IUserAccess } from './user-access.interface'
import { IUserModuleAccess } from './user-module-access.interface'

export interface IUserRole {
    id: string
    roleType: string
    roleDescription: string
    updatedAt: string | null
    createdAt: string
    deletedAt: string | null
    userAccess: IUserAccess[]
    moduleAccessList: IUserModuleAccess[]
}
