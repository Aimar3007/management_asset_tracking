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
    payload?: T
    params?: T
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
    search?: string
    isSuccess?: boolean
    meta: IMeta
    links: IMetaLinks
    additionals: any
    errors?: any
    pagination: IPagination
}

export interface IPagination {
    totalPage: number
    next?: {
        page: number
        limit: number
    }
    prev?: {
        page: number
        limit: number
    }
}

export interface IMeta {
    current_page: number
    last_page: number
    per_page: number
    total_page: number
    total_Items?: number
    from: number
    to: number
    index_end: number
    index_start: number
}
export interface IMetaLinks {
    next_page: string | null
    previous_page: string | null
    first_page: string | null
    last_page: string | null
}

export interface ITableTabs {
    header: string
    body: number
    className: string
}

export interface IAdditionals {
    stats: [
        {
            status: string
            count: number
            childStatus?: [{ status: string; count: number }]
        },
    ]
}
export interface IAdditionalss {
    status: string
    count: number
}
