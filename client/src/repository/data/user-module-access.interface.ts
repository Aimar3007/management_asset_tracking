import { IUserAction } from './user-action.interface'

export interface IUserModuleAccess {
    id: string
    moduleName: string
    moduleDescription: string | null
    priority: string | null
    status: boolean
    updatedAt: string | null
    createdAt: string
    deletedAt: string | null
    parentId: string
    actionList: IUserAction[]
}
