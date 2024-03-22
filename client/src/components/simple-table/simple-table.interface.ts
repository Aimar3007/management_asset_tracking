/* eslint-disable no-unused-vars */
export interface ISimpleTable<T> {
    title?: string
    headers: ISTColumn<T>[]
    data: T[]
    headerHover?: boolean // default false
    disableLastRowHover?: boolean // default false
    onRowClick?: (data: T) => void
    contentHeight?: number
    dynamicClass?: string
    isCellInput?: boolean
    action?: any
    setData?: any
    variant?: 'white' | 'gray'
    isRemoveRow?: boolean
    isAddRow?: boolean
    loading?: boolean
    addRowClick?: () => void
    isDownload?: boolean
    enableActionButton?: boolean
    onClickAcitonButton?: (value: string, value2: string) => void
}

export interface ISTColumn<T> {
    accessor: keyof T
    label: string
    sort?: boolean // default true
    showLabel?: boolean // default true
    minWidth?: number
    customBuild?: (
        data: string | T,
        setHandle?: any,
        id?: number,
        value?: string,
        rowData?: T,
    ) => React.ReactElement
    customHeader?: () => React.ReactElement
    isTextValue?: boolean
}
