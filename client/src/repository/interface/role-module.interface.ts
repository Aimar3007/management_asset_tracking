export interface IRoleModule {
    id: string
    moduleName: string
    moduleDescription: any
    priority: any
    status: boolean
    updatedAt: any
    createdAt: string
    deletedAt: any
    parentId: string
    selected?: boolean
    actionList: IActionList[]
    selectAllAction?: boolean
    sub?: IRoleModule[]
}

export interface IActionList {
    action: string
    actionDescription: string
    status: boolean
}
