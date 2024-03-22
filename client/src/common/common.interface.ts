export interface IMenu {
    active?: boolean
    showName?: boolean

    // eslint-disable-next-line no-unused-vars
    action: (props: string) => void
}

export interface IFetch<T> {
    endpoint: string
    params?: T
}

export interface IBlob<T> {
    endpoint: string
    params?: T
}

export interface IFetchOptions {
    endpoint: string
}

export interface IPost<T> {
    endpoint: string
    payload: T
    isFormData?: boolean
}

export interface IRoute {
    icon?: string
    text: string
    path: string
    Content?: () => JSX.Element
    show?: boolean
    expandable?: boolean
    sub?: IRoute[]
    isSubMenu?: boolean
    index?: number
    openSideBar?: Function
    client?: string[]
    showSearch?: boolean
    parentId?: string
}

export interface IResponseData<T> {
    message: string
    data: T
    isSuccess?: boolean
    meta: IMeta
}

export interface IMeta {
    currentPage: number
    lastPage: number
    perPage: number
    totalPage: number
    totalItems?: number
    indexEnd: number
    indexStart: number
}
